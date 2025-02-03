import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  dateFormat: string;
  currency: string;
  timezone: string;
  language: string;
}

interface UserPreferencesStore extends UserPreferences {
  setTheme: (theme: UserPreferences['theme']) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDateFormat: (format: string) => void;
  setCurrency: (currency: string) => void;
  setTimezone: (timezone: string) => void;
  setLanguage: (language: string) => void;
}

export const useUserPreferences = create<UserPreferencesStore>()(
  persist(
    set => ({
      // Default preferences
      theme: 'system',
      sidebarCollapsed: false,
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',

      // Actions
      setTheme: theme => set({theme}),
      setSidebarCollapsed: collapsed => set({sidebarCollapsed: collapsed}),
      setDateFormat: format => set({dateFormat: format}),
      setCurrency: currency => set({currency}),
      setTimezone: timezone => set({timezone}),
      setLanguage: language => set({language}),
    }),
    {
      name: 'user-preferences',
      version: 1,
    },
  ),
);
