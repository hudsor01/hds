import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  reducedMotion: boolean;
  lastSynced?: number;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setAnimations: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  sync: () => Promise<void>;
}

const SYNC_ENDPOINT = '/api/preferences/sync';

export const usePreferences = create<UserPreferences>()(
  persist(
    (set, get) => ({
      fontSize: 'medium',
      animations: true,
      reducedMotion: false,

      setFontSize: (size) => set({ fontSize: size }),
      setAnimations: (enabled) => set({ animations: enabled }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),

      sync: async () => {
        try {
          const response = await fetch(SYNC_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              preferences: {
                fontSize: get().fontSize,
                animations: get().animations,
                reducedMotion: get().reducedMotion,
              },
              lastSynced: get().lastSynced,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            set({ ...data, lastSynced: Date.now() });
          }
        } catch (error) {
          console.error('Failed to sync preferences:', error);
        }
      },
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        fontSize: state.fontSize,
        animations: state.animations,
        reducedMotion: state.reducedMotion,
        lastSynced: state.lastSynced,
      }),
    },
  ),
);
