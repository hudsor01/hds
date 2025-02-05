import {useEffect} from 'react';

export function usePreferencesSync() {
  useEffect(() => {
    // Load preferences from localStorage
    const loadPreferences = () => {
      try {
        const storedPrefs = localStorage.getItem('userPreferences');
        if (storedPrefs) {
          return JSON.parse(storedPrefs);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
      return null;
    };

    // Initialize preferences
    const prefs = loadPreferences();
    if (prefs) {
      // Apply loaded preferences
      document.documentElement.setAttribute('data-theme', prefs.theme || 'light');
    }
  }, []);
}
