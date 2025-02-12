'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { lightTheme, darkTheme } from '@/lib/theme'

export const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    setTheme(prefersDarkMode ? darkTheme : lightTheme)
  }, [prefersDarkMode])

  return theme
}
