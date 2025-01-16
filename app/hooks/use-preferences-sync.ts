import { usePreferences } from '@/stores/preferences'
import { useEffect } from 'react'

export function usePreferencesSync() {
  const sync = usePreferences((state) => state.sync)

  useEffect(() => {
    // Sync on mount
    sync()

    // Sync every 5 minutes if the tab is active
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        sync()
      }
    }, 5 * 60 * 1000)

    // Sync when the tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sync()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [sync])
}
