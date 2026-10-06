// Servicio para persistencia local de alta velocidad y compatibilidad offline
export const storageService = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`prograpp_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error leyendo clave ${key} de localStorage:`, e);
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`prograpp_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`Error guardando clave ${key} en localStorage:`, e);
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(`prograpp_${key}`);
    } catch (e) {
      console.error(`Error eliminando clave ${key} de localStorage:`, e);
    }
  }
};
