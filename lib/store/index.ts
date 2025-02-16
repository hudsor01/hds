import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// UI Store
interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      set => ({
        theme: 'system',
        sidebarOpen: false,
        setTheme: theme => set({ theme }),
        toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: open => set({ sidebarOpen: open })
      }),
      { name: 'ui-store' }
    )
  )
)

// User Preferences Store
interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  language: string
  timezone: string
}

interface PreferencesState {
  preferences: UserPreferences
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void
  setNotificationPreference: (type: keyof UserPreferences['notifications'], enabled: boolean) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  devtools(
    persist(
      set => ({
        preferences: {
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          language: 'en',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        setPreference: (key, value) =>
          set(state => ({
            preferences: { ...state.preferences, [key]: value }
          })),
        setNotificationPreference: (type, enabled) =>
          set(state => ({
            preferences: {
              ...state.preferences,
              notifications: {
                ...state.preferences.notifications,
                [type]: enabled
              }
            }
          }))
      }),
      { name: 'preferences-store' }
    )
  )
)

// Dashboard Store
interface DashboardState {
  selectedPropertyId: string | null
  selectedTenantId: string | null
  filters: {
    status: string[]
    type: string[]
    dateRange: [Date | null, Date | null]
  }
  setSelectedProperty: (id: string | null) => void
  setSelectedTenant: (id: string | null) => void
  setFilter: <K extends keyof DashboardState['filters']>(key: K, value: DashboardState['filters'][K]) => void
  resetFilters: () => void
}

export const useDashboardStore = create<DashboardState>()(
  devtools(set => ({
    selectedPropertyId: null,
    selectedTenantId: null,
    filters: {
      status: [],
      type: [],
      dateRange: [null, null]
    },
    setSelectedProperty: id => set({ selectedPropertyId: id }),
    setSelectedTenant: id => set({ selectedTenantId: id }),
    setFilter: (key, value) =>
      set(state => ({
        filters: { ...state.filters, [key]: value }
      })),
    resetFilters: () =>
      set({
        filters: {
          status: [],
          type: [],
          dateRange: [null, null]
        }
      })
  }))
)
