import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  sidebarCollapsed: boolean
  notificationsEnabled: boolean
  currency: string
  dateFormat: string
}

interface UserPreferencesStore extends UserPreferences {
  setTheme: (theme: UserPreferences['theme']) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setCurrency: (currency: string) => void
  setDateFormat: (format: string) => void
}

export const useUserPreferences = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      // Default preferences
      theme: 'system',
      sidebarCollapsed: false,
      notificationsEnabled: true,
      currency: 'USD',
      dateFormat: 'MM/dd/yyyy',

      // Actions
      setTheme: (theme) => set({ theme }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setCurrency: (currency) => set({ currency }),
      setDateFormat: (format) => set({ dateFormat }),
    }),
    {
      name: 'user-preferences',
    }
  )
)
