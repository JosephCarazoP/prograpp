import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { authService, ADMIN_AUTHORIZED_EMAIL } from './authService';
import { AdminSecurityConfig } from '../types/academic';

// Duración de la autorización administrativa en memoria (30 minutos)
const ADMIN_SESSION_DURATION_MS = 30 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutos de bloqueo

// Token de autorización volátil EN MEMORIA (nunca en LocalStorage para máxima seguridad)
let volatileAdminSessionToken: {
  authorizedUid: string;
  expiresAt: number;
} | null = null;

// Funciones criptográficas WebCrypto nativas (PBKDF2-SHA256 con Salt)
async function deriveKeyFromPassword(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const saltBytes = new Uint8Array(
    saltHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
  );

  const derivedKey = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  return Array.from(new Uint8Array(derivedKey))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateRandomSalt(): string {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const adminSecurityService = {
  // Comprobar si la sesión administrativa volátil en memoria sigue activa y válida
  isSessionUnlocked(): boolean {
    const currentFirebaseUser = authService.getCurrentUser();
    if (!currentFirebaseUser) {
      volatileAdminSessionToken = null;
      return false;
    }

    if (!authService.isCurrentUserAdmin()) {
      volatileAdminSessionToken = null;
      return false;
    }

    if (!volatileAdminSessionToken) return false;

    if (Date.now() > volatileAdminSessionToken.expiresAt) {
      volatileAdminSessionToken = null;
      return false;
    }

    if (volatileAdminSessionToken.authorizedUid !== currentFirebaseUser.uid) {
      volatileAdminSessionToken = null;
      return false;
    }

    return true;
  },

  // Obtener estado actual de configuración de la contraseña administrativa en Firestore
  async getSecurityConfig(): Promise<AdminSecurityConfig | null> {
    if (!isLocalMockMode && db) {
      try {
        const configDocRef = doc(db, 'adminConfig', 'security');
        const snapshot = await getDoc(configDocRef);
        if (snapshot.exists()) {
          return snapshot.data() as AdminSecurityConfig;
        }
      } catch (err) {
        console.warn('[adminSecurity] Error al consultar configuración en Firestore:', err);
      }
    }

    // Fallback local seguro (solo en desarrollo o mock)
    const localRaw = localStorage.getItem('__admin_sec_cfg');
    if (localRaw) {
      try {
        return JSON.parse(localRaw);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Comprobar si la contraseña ya fue creada por primera vez
  async isPasswordConfigured(): Promise<boolean> {
    const config = await this.getSecurityConfig();
    return Boolean(config && config.passwordHash && config.salt);
  },

  // Crear la contraseña administrativa por primera vez (Requiere reautenticación de cuenta)
  async setupInitialPassword(newPassword: string, reauthAccountPassword: string): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.email) {
      throw new Error('Debes haber iniciado sesión con la cuenta autorizada.');
    }

    if (currentUser.email.toLowerCase() !== ADMIN_AUTHORIZED_EMAIL.toLowerCase()) {
      throw new Error('Esta acción está restringida exclusivamente a ' + ADMIN_AUTHORIZED_EMAIL);
    }

    if (newPassword.length < 8) {
      throw new Error('La contraseña administrativa debe tener al menos 8 caracteres.');
    }

    // Exigir reautenticación reciente de la cuenta para impedir que una sesión desatendida cree la clave
    const reauthed = await authService.reauthenticateCurrentUser(reauthAccountPassword);
    if (!reauthed) {
      throw new Error('La contraseña de tu cuenta de correo no es correcta.');
    }

    const salt = generateRandomSalt();
    const hash = await deriveKeyFromPassword(newPassword, salt);

    const config: AdminSecurityConfig = {
      adminEmail: ADMIN_AUTHORIZED_EMAIL,
      authorizedUid: currentUser.uid,
      passwordHash: hash,
      salt: salt,
      failedAttempts: 0,
      lockoutUntil: 0,
      lastChangedAt: Date.now()
    };

    if (!isLocalMockMode && db) {
      const configDocRef = doc(db, 'adminConfig', 'security');
      await setDoc(configDocRef, config);
    } else {
      localStorage.setItem('__admin_sec_cfg', JSON.stringify(config));
    }

    // Desbloquear sesión en memoria de corta duración
    volatileAdminSessionToken = {
      authorizedUid: currentUser.uid,
      expiresAt: Date.now() + ADMIN_SESSION_DURATION_MS
    };

    return true;
  },

  // Validar contraseña administrativa para desbloquear la sección de seguimiento
  async unlockWithPassword(password: string): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.email) {
      throw new Error('Debes iniciar sesión primero.');
    }

    if (currentUser.email.toLowerCase() !== ADMIN_AUTHORIZED_EMAIL.toLowerCase()) {
      throw new Error('Acceso denegado: solo el administrador puede acceder.');
    }

    const config = await this.getSecurityConfig();
    if (!config || !config.passwordHash || !config.salt) {
      throw new Error('La contraseña administrativa aún no ha sido creada.');
    }

    // Verificar si hay bloqueo activo por intentos fallidos
    if (config.lockoutUntil && Date.now() < config.lockoutUntil) {
      const remainingMin = Math.ceil((config.lockoutUntil - Date.now()) / 60000);
      throw new Error(`Acceso temporalmente bloqueado por exceso de intentos. Espera ${remainingMin} minuto(s).`);
    }

    const computedHash = await deriveKeyFromPassword(password, config.salt);

    if (computedHash !== config.passwordHash) {
      const newFailed = (config.failedAttempts || 0) + 1;
      const willLockout = newFailed >= MAX_FAILED_ATTEMPTS;
      const lockoutUntil = willLockout ? Date.now() + LOCKOUT_DURATION_MS : 0;

      const updatedConfig: AdminSecurityConfig = {
        ...config,
        failedAttempts: willLockout ? 0 : newFailed,
        lockoutUntil
      };

      if (!isLocalMockMode && db) {
        await setDoc(doc(db, 'adminConfig', 'security'), updatedConfig);
      } else {
        localStorage.setItem('__admin_sec_cfg', JSON.stringify(updatedConfig));
      }

      if (willLockout) {
        throw new Error('Se superó el límite de 5 intentos fallidos. Sección bloqueada por 15 minutos.');
      } else {
        const left = MAX_FAILED_ATTEMPTS - newFailed;
        throw new Error(`Contraseña incorrecta. Te quedan ${left} intento(s) antes del bloqueo temporal.`);
      }
    }

    // Éxito: resetear intentos fallidos y registrar token en memoria
    if (config.failedAttempts > 0) {
      const resetConfig: AdminSecurityConfig = {
        ...config,
        failedAttempts: 0,
        lockoutUntil: 0
      };
      if (!isLocalMockMode && db) {
        await setDoc(doc(db, 'adminConfig', 'security'), resetConfig);
      } else {
        localStorage.setItem('__admin_sec_cfg', JSON.stringify(resetConfig));
      }
    }

    volatileAdminSessionToken = {
      authorizedUid: currentUser.uid,
      expiresAt: Date.now() + ADMIN_SESSION_DURATION_MS
    };

    return true;
  },

  // Cambiar contraseña administrativa (Requiere contraseña actual y reautenticación)
  async changePassword(
    currentAdminPassword: string,
    newAdminPassword: string,
    reauthAccountPassword: string
  ): Promise<boolean> {
    const isUnlocked = await this.unlockWithPassword(currentAdminPassword);
    if (!isUnlocked) {
      throw new Error('Contraseña administrativa actual incorrecta.');
    }

    return this.setupInitialPassword(newAdminPassword, reauthAccountPassword);
  },

  // Bloquear manualmente la sección administrativa
  lockSession(): void {
    volatileAdminSessionToken = null;
  }
};
