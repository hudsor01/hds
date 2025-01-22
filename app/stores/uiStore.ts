// stores/uiStore.ts
import { create } from 'zustand'

type UIState = {
  darkMode: boolean;
  notifications: Notification[];
  actions: {
    toggleDarkMode: () => void;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  };
};

type Notification = {
  id: string;
  type: 'info' | 'success' | 'error';
  message: string;
  timestamp: Date;
};

const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  notifications: [],
  actions: {
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          ...state.notifications,
          {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date(),
          }
        ]
      }))
  }
}));

export default useUIStore;
