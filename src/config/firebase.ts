import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore
} from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'MOCK_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'prograpp.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'prograpp-edu',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'prograpp-edu.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1010855947891',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1010855947891:web:187e5f3b5addaf186dc406',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-BZGF2L7PQQ'
};

export const isLocalMockMode =
  import.meta.env.VITE_USE_LOCAL_MOCK === 'true' ||
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key_here';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (!isLocalMockMode) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    
    // Inicializar Firestore con persistencia IndexedDB multi-pestaña para Offline-First real
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });

    auth = getAuth(app);
    console.log('[Firebase] Inicializado con persistencia Offline activa.');
  } catch (error) {
    console.warn('[Firebase] Error al inicializar cliente real, operando en modo local seguro:', error);
  }
} else {
  console.log('[PrograApp] Operando en Modo Local / Offline Mock con persistencia IndexedDB y LocalStorage.');
}

export { app, db, auth };
