// Inicializar Firebase Admin dinámicamente si está instalado en el entorno
async function getFirebaseAdmin() {
  let admin;
  try {
    // Dynamic import seguro para no romper entornos donde firebase-admin no esté aún instalado
    const dynamicImport = new Function('specifier', 'return import(specifier)');
    const adminMod = await dynamicImport('firebase-admin');
    admin = adminMod.default || adminMod;
  } catch (err) {
    console.warn('[delete-student] firebase-admin no se encuentra instalado en este entorno.');
    return null;
  }

  if (!admin) return null;

  if (admin.apps && admin.apps.length > 0) {
    return admin;
  }

  const projectId =
    process.env.VITE_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    'prograpp-app';

  // 1. Intentar con variable JSON o Base64 FIREBASE_SERVICE_ACCOUNT_KEY
  const serviceAccountKeyRaw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountKeyRaw) {
    try {
      const raw = serviceAccountKeyRaw.trim();
      const serviceAccount = raw.startsWith('{')
        ? JSON.parse(raw)
        : JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || projectId
      });
      return admin;
    } catch (err) {
      console.error('[delete-student] Error al procesar FIREBASE_SERVICE_ACCOUNT_KEY:', err);
    }
  }

  // 2. Intentar con variables de entorno individuales
  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        }),
        projectId: projectId
      });
      return admin;
    } catch (err) {
      console.error('[delete-student] Error al inicializar con variables individuales:', err);
    }
  }

  // 3. Fallback: Google Application Default Credentials
  try {
    admin.initializeApp({ projectId });
    return admin;
  } catch (err) {
    console.warn('[delete-student] Inicialización por defecto falló:', err);
  }

  return admin;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
  }

  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Encabezado de autorización ausente o no válido (Bearer token requerido).'
      });
    }

    const idToken = authHeader.split('Bearer ')[1].trim();
    const adminApp = await getFirebaseAdmin();

    // Verificar si las credenciales de Firebase Admin están listas
    if (!adminApp || !adminApp.apps || adminApp.apps.length === 0) {
      return res.status(500).json({
        success: false,
        authDeleted: false,
        error: 'FIREBASE_SERVICE_ACCOUNT_MISSING',
        message:
          'No se configuraron las credenciales de Firebase Admin (FIREBASE_SERVICE_ACCOUNT_KEY) en el servidor/Vercel.'
      });
    }

    // 1. Validar el token de autorización del usuario que ejecuta la acción
    let decodedToken;
    try {
      decodedToken = await adminApp.auth().verifyIdToken(idToken);
    } catch (authErr) {
      console.error('[delete-student] Error validando ID token:', authErr);
      return res.status(401).json({
        success: false,
        error: 'Sesión no válida o expirada. Por favor recarga e inicia sesión nuevamente.',
        details: authErr.message
      });
    }

    // 2. Validar que quien ejecuta es el docente administrador oficial
    const ADMIN_EMAIL = 'josephcarazo56@gmail.com';
    const callerEmail = (decodedToken.email || '').toLowerCase();

    if (callerEmail !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({
        success: false,
        error: 'Permiso denegado. Solo el docente administrador puede eliminar estudiantes.'
      });
    }

    // 3. Extraer el UID del estudiante a eliminar
    const { uid } = req.body || {};
    if (!uid || typeof uid !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'El identificador UID del estudiante es requerido.'
      });
    }

    // Protección de seguridad: Evitar auto-eliminación accidental del administrador
    if (uid === decodedToken.uid) {
      return res.status(400).json({
        success: false,
        error: 'Operación no permitida: no puedes eliminar la cuenta de administrador actual.'
      });
    }

    // 4. Eliminar de Firebase Authentication
    let authDeleted = false;
    let authError = null;
    try {
      await adminApp.auth().deleteUser(uid);
      authDeleted = true;
      console.log(`[delete-student] Usuario ${uid} eliminado de Authentication.`);
    } catch (delAuthErr) {
      if (delAuthErr.code === 'auth/user-not-found') {
        authDeleted = true; // Si no existe en Auth, ya está limpio
      } else {
        console.error('[delete-student] Error eliminando en Auth:', delAuthErr);
        authError = delAuthErr.message;
      }
    }

    // 5. Eliminar de Firestore (ficha, presencia, perfil y subcolecciones)
    let firestoreDeleted = false;
    let firestoreError = null;
    try {
      const db = adminApp.firestore();

      // Eliminar ficha de usuario
      await db.collection('users').doc(uid).delete();

      // Eliminar estado de presencia si existe
      await db.collection('presence').doc(uid).delete().catch(() => {});

      // Eliminar perfil público si existe
      await db.collection('publicProfiles').doc(uid).delete().catch(() => {});

      // Borrado recursivo de subcolecciones (progress, attempts, activityDays, etc.)
      if (typeof db.recursiveDelete === 'function') {
        const userRef = db.collection('users').doc(uid);
        await db.recursiveDelete(userRef).catch(() => {});
      }

      firestoreDeleted = true;
      console.log(`[delete-student] Documentos de ${uid} eliminados de Firestore.`);
    } catch (delFsErr) {
      console.error('[delete-student] Error eliminando en Firestore:', delFsErr);
      firestoreError = delFsErr.message;
    }

    return res.status(200).json({
      success: authDeleted || firestoreDeleted,
      authDeleted,
      firestoreDeleted,
      authError,
      firestoreError,
      message:
        authDeleted && firestoreDeleted
          ? 'Estudiante eliminado con éxito de Firestore y de Firebase Authentication.'
          : authDeleted
          ? 'Estudiante eliminado de Authentication. Ocurrió un error en Firestore.'
          : 'Estudiante eliminado de Firestore. Nota de Authentication: ' + (authError || 'Verificar credenciales.')
    });
  } catch (error) {
    console.error('[delete-student] Error en handler:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor.',
      details: error.message
    });
  }
}
