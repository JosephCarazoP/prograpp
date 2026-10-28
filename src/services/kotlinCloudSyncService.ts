import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, isLocalMockMode } from '../config/firebase';
import { KotlinFile, UserKotlinProject } from '../types/kotlinLab';

export interface CloudKotlinRecord {
  id: string;
  userId: string;
  projectId: string;
  projectName: string;
  files: KotlinFile[];
  version: string;
  updatedAt: number;
}

const DIRTY_PREFIX = 'prograpp_kotlin_dirty_';
const MOCK_CLOUD_PREFIX = 'prograpp_mock_cloud_kt_';
const MOCK_PROJECTS_LIST_KEY = 'prograpp_mock_cloud_kt_projects_';

function cleanFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      if (Array.isArray(val)) {
        cleaned[key] = val.map(item => (typeof item === 'object' && item !== null ? cleanFirestoreData(item) : item));
      } else if (typeof val === 'object' && val !== null) {
        cleaned[key] = cleanFirestoreData(val);
      } else {
        cleaned[key] = val;
      }
    }
  }
  return cleaned;
}

class KotlinCloudSyncService {
  public markDirty(storageKey: string): void {
    try {
      localStorage.setItem(`${DIRTY_PREFIX}${storageKey}`, 'true');
    } catch (e) {
      console.warn('Error marking kotlin project as dirty:', e);
    }
  }

  public markClean(storageKey: string): void {
    try {
      localStorage.removeItem(`${DIRTY_PREFIX}${storageKey}`);
    } catch (e) {
      console.warn('Error clearing kotlin project dirty status:', e);
    }
  }

  public isDirty(storageKey: string): boolean {
    try {
      return localStorage.getItem(`${DIRTY_PREFIX}${storageKey}`) === 'true';
    } catch {
      return false;
    }
  }

  public async syncToCloud(
    userId: string,
    projectId: string,
    data: { projectName: string; files: KotlinFile[]; version: string }
  ): Promise<{ success: boolean; error?: string }> {
    if (!userId || userId === 'guest') {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const record: CloudKotlinRecord = {
      id: projectId,
      userId,
      projectId,
      projectName: data.projectName,
      files: data.files,
      version: data.version,
      updatedAt: Date.now()
    };

    if (isLocalMockMode || !db) {
      try {
        localStorage.setItem(`${MOCK_CLOUD_PREFIX}${userId}_${projectId}`, JSON.stringify(record));
        this.markClean(projectId);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Error guardando en almacenamiento mock' };
      }
    }

    try {
      const docRef = doc(db, 'users', userId, 'kotlin_lab', projectId);
      await setDoc(docRef, cleanFirestoreData(record), { merge: true });
      this.markClean(projectId);
      return { success: true };
    } catch (err: any) {
      console.error('Error sincronizando proyecto Kotlin en la nube:', err);
      return { success: false, error: err?.message || 'Error al conectar con la nube' };
    }
  }

  public async loadFromCloud(userId: string, projectId: string): Promise<CloudKotlinRecord | null> {
    if (!userId || userId === 'guest') return null;

    if (isLocalMockMode || !db) {
      const raw = localStorage.getItem(`${MOCK_CLOUD_PREFIX}${userId}_${projectId}`);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as CloudKotlinRecord;
      } catch {
        return null;
      }
    }

    try {
      const docRef = doc(db, 'users', userId, 'kotlin_lab', projectId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as CloudKotlinRecord;
      }
      return null;
    } catch (err) {
      console.warn('Error cargando proyecto Kotlin desde la nube:', err);
      return null;
    }
  }

  public async syncUserProjectsList(userId: string, projects: UserKotlinProject[]): Promise<void> {
    if (!userId || userId === 'guest') return;

    if (isLocalMockMode || !db) {
      localStorage.setItem(`${MOCK_PROJECTS_LIST_KEY}${userId}`, JSON.stringify(projects));
      return;
    }

    try {
      const docRef = doc(db, 'users', userId, 'kotlin_lab_meta', 'projects_list');
      await setDoc(docRef, { projects: cleanFirestoreData({ list: projects }).list, updatedAt: Date.now() }, { merge: true });
    } catch (err) {
      console.warn('Error sincronizando lista de proyectos Kotlin:', err);
    }
  }

  public async loadUserProjectsList(userId: string): Promise<UserKotlinProject[]> {
    if (!userId || userId === 'guest') return [];

    if (isLocalMockMode || !db) {
      const raw = localStorage.getItem(`${MOCK_PROJECTS_LIST_KEY}${userId}`);
      if (!raw) return [];
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }

    try {
      const docRef = doc(db, 'users', userId, 'kotlin_lab_meta', 'projects_list');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        return (data.projects as UserKotlinProject[]) || [];
      }
      return [];
    } catch (err) {
      console.warn('Error cargando lista de proyectos Kotlin desde la nube:', err);
      return [];
    }
  }

  public async deleteFromCloud(userId: string, projectId: string): Promise<void> {
    if (!userId || userId === 'guest') return;

    if (isLocalMockMode || !db) {
      localStorage.removeItem(`${MOCK_CLOUD_PREFIX}${userId}_${projectId}`);
      return;
    }

    try {
      const docRef = doc(db, 'users', userId, 'kotlin_lab', projectId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Error eliminando proyecto Kotlin de la nube:', err);
    }
  }
}

export const kotlinCloudSyncService = new KotlinCloudSyncService();
