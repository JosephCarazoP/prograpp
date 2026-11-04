const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

const ADMIN_AUTHORIZED_EMAIL = 'josephcarazo56@gmail.com';

/**
 * Callable Function para eliminar a un estudiante de Firestore y de Firebase Authentication
 */
exports.deleteStudent = onCall(async (request) => {
  // 1. Validar autenticación
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes estar autenticado para realizar esta acción.');
  }

  // 2. Validar privilegios de administrador
  const callerEmail = (request.auth.token.email || '').toLowerCase();
  if (callerEmail !== ADMIN_AUTHORIZED_EMAIL.toLowerCase()) {
    throw new HttpsError('permission-denied', 'Solo el administrador autorizado puede eliminar estudiantes.');
  }

  // 3. Validar UID
  const { uid } = request.data || {};
  if (!uid || typeof uid !== 'string') {
    throw new HttpsError('invalid-argument', 'El UID del estudiante es obligatorio.');
  }

  // Evitar auto-eliminación
  if (uid === request.auth.uid) {
    throw new HttpsError('failed-precondition', 'No puedes eliminar tu propia cuenta de administrador.');
  }

  let authDeleted = false;
  let authError = null;

  // 4. Eliminar de Firebase Authentication
  try {
    await admin.auth().deleteUser(uid);
    authDeleted = true;
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      authDeleted = true;
    } else {
      authError = err.message || String(err);
    }
  }

  // 5. Eliminar de Firestore
  let firestoreDeleted = false;
  try {
    const db = admin.firestore();
    await db.collection('users').doc(uid).delete();
    await db.collection('presence').doc(uid).delete().catch(() => {});
    await db.collection('publicProfiles').doc(uid).delete().catch(() => {});

    if (typeof db.recursiveDelete === 'function') {
      await db.recursiveDelete(db.collection('users').doc(uid)).catch(() => {});
    }

    firestoreDeleted = true;
  } catch (err) {
    console.error('Error al eliminar en Firestore:', err);
  }

  return {
    success: authDeleted || firestoreDeleted,
    authDeleted,
    firestoreDeleted,
    authError,
    message: authDeleted && firestoreDeleted
      ? 'Estudiante eliminado con éxito de Firestore y de Firebase Authentication.'
      : 'Eliminado de Firestore. Estado en Auth: ' + (authError || 'Verificar')
  };
});
