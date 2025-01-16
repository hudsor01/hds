import { useEffect, useState } from 'react'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    security: boolean
  }
  timezone: string
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    security: true,
  },
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load preferences from localStorage or API
    const loadPreferences = async () => {
      try {
        const stored = localStorage.getItem('user-preferences')
        if (stored) {
          setPreferences(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Failed to load preferences:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [])

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    try {
      const updated = { ...preferences, ...newPreferences }
      setPreferences(updated)
      localStorage.setItem('user-preferences', JSON.stringify(updated))
      // Here you would also sync with your backend
    } catch (error) {
      console.error('Failed to update preferences:', error)
      throw error
    }
  }

  return {
    preferences,
    updatePreferences,
    isLoading,
  }
}
