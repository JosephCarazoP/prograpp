import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { LabInstructionPost, LabInstructionTarget } from '../types/labInstruction';

const LOCAL_INSTRUCTIONS_KEY = 'prograpp_lab_instructions_v1';
const LOCAL_SEEN_PREFIX = 'prograpp_lab_instructions_seen_';
const COLLECTION_NAME = 'lab_instructions';

function getLocalCache(): LabInstructionPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_INSTRUCTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalCache(posts: LabInstructionPost[]): void {
  try {
    localStorage.setItem(LOCAL_INSTRUCTIONS_KEY, JSON.stringify(posts));
  } catch (err) {
    console.warn('[labInstructionService] No se pudo guardar caché local:', err);
  }
}

function sortPosts(posts: LabInstructionPost[]): LabInstructionPost[] {
  return [...posts].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) {
      return a.pinned ? -1 : 1;
    }
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

function filterByLab(posts: LabInstructionPost[], lab: 'sql' | 'kotlin' | 'all'): LabInstructionPost[] {
  const sorted = sortPosts(posts);
  if (lab === 'all') return sorted;
  return sorted.filter(p => p.labType === lab || p.labType === 'both');
}

export const labInstructionService = {
  /**
   * Obtiene todas las instrucciones para un laboratorio ('sql' | 'kotlin' | 'all')
   */
  async getInstructions(lab: 'sql' | 'kotlin' | 'all' = 'all'): Promise<LabInstructionPost[]> {
    const localPosts = getLocalCache();

    if (!isLocalMockMode && db) {
      try {
        const snap = await getDocs(collection(db, COLLECTION_NAME));
        const remoteMap = new Map<string, LabInstructionPost>();
        snap.docs.forEach(d => {
          const data = d.data() as LabInstructionPost;
          if (data && data.id) {
            remoteMap.set(data.id, data);
          }
        });

        const merged = Array.from(remoteMap.values());
        saveLocalCache(merged);
        return filterByLab(merged, lab);
      } catch (err) {
        console.warn('[labInstructionService] Error leyendo de Firestore, usando caché local:', err);
      }
    }

    return filterByLab(localPosts, lab);
  },

  /**
   * Suscripción en tiempo real a las instrucciones del laboratorio
   */
  subscribeToInstructions(
    lab: 'sql' | 'kotlin' | 'all',
    callback: (posts: LabInstructionPost[]) => void
  ): () => void {
    // Emitir caché local inmediatamente para carga instantánea
    callback(filterByLab(getLocalCache(), lab));

    if (!isLocalMockMode && db) {
      try {
        const colRef = collection(db, COLLECTION_NAME);
        const unsubscribe = onSnapshot(
          colRef,
          snapshot => {
            const list: LabInstructionPost[] = [];
            snapshot.forEach(docSnap => {
              const data = docSnap.data() as LabInstructionPost;
              if (data && data.id) {
                list.push(data);
              }
            });
            saveLocalCache(list);
            callback(filterByLab(list, lab));
          },
          err => {
            console.warn('[labInstructionService] Error en suscripción en tiempo real:', err);
          }
        );
        return unsubscribe;
      } catch (err) {
        console.warn('[labInstructionService] Fallo al iniciar onSnapshot:', err);
      }
    }

    return () => {};
  },

  /**
   * Crea o actualiza una publicación de instrucción de laboratorio
   */
  async saveInstruction(
    postData: Omit<LabInstructionPost, 'id' | 'createdAt'> & { id?: string; createdAt?: number }
  ): Promise<LabInstructionPost> {
    const now = Date.now();
    const id = postData.id || `inst_${now}_${Math.random().toString(36).substring(2, 7)}`;

    const fullPost: LabInstructionPost = {
      id,
      labType: postData.labType as LabInstructionTarget,
      title: postData.title.trim(),
      subtitle: postData.subtitle?.trim() || '',
      summary: postData.summary.trim(),
      content: postData.content,
      images: postData.images || [],
      scripts: postData.scripts || [],
      links: postData.links || [],
      authorName: postData.authorName || 'Profesor',
      createdAt: postData.createdAt || now,
      updatedAt: now,
      pinned: Boolean(postData.pinned)
    };

    const current = getLocalCache();
    const existingIdx = current.findIndex(p => p.id === id);
    if (existingIdx >= 0) {
      current[existingIdx] = fullPost;
    } else {
      current.unshift(fullPost);
    }
    saveLocalCache(current);

    if (!isLocalMockMode && db) {
      await setDoc(doc(db, COLLECTION_NAME, id), fullPost);
    }

    return fullPost;
  },

  /**
   * Elimina una instrucción de laboratorio
   */
  async deleteInstruction(id: string): Promise<void> {
    const current = getLocalCache().filter(p => p.id !== id);
    saveLocalCache(current);

    if (!isLocalMockMode && db) {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    }
  },

  /**
   * Fija o desfija una instrucción en la parte superior
   */
  async togglePin(post: LabInstructionPost): Promise<LabInstructionPost> {
    return this.saveInstruction({
      ...post,
      pinned: !post.pinned
    });
  },

  /**
   * Registra que un estudiante ya vio una instrucción
   */
  markAsSeen(uid: string, postId: string): void {
    try {
      const key = `${LOCAL_SEEN_PREFIX}${uid || 'guest'}`;
      const raw = localStorage.getItem(key);
      const seenIds: string[] = raw ? JSON.parse(raw) : [];
      if (!seenIds.includes(postId)) {
        seenIds.push(postId);
        localStorage.setItem(key, JSON.stringify(seenIds));
      }
    } catch {}
  },

  /**
   * Obtiene los IDs de instrucciones vistas por el usuario
   */
  getSeenIds(uid: string): string[] {
    try {
      const key = `${LOCAL_SEEN_PREFIX}${uid || 'guest'}`;
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Comprime una imagen (subida o pegada del portapapeles) a DataURL optimizado
   * para que pueda guardarse en Firestore sin superar el límite de 1MB.
   */
  async compressImageFile(file: File, maxWidth = 1050, quality = 0.78): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/webp', quality);
          // Fallback a jpeg si el navegador no soporta webp
          if (dataUrl.startsWith('data:image/webp')) {
            resolve(dataUrl);
          } else {
            resolve(canvas.toDataURL('image/jpeg', quality));
          }
        };
        img.onerror = () => reject(new Error('No se pudo procesar la imagen seleccionada.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Error leyendo el archivo de imagen.'));
      reader.readAsDataURL(file);
    });
  }
};

