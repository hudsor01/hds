'use client'

import { useUserPreferences } from '@/hooks/use-user-preferences'
import {
  Box,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

export function GeneralSettings() {
  const {
    theme,
    language,
    timezone,
    dateFormat,
    setTheme,
    setLanguage,
    setTimezone,
    setDateFormat,
  } = useUserPreferences()

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        General Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your general preferences and account settings
      </Typography>

      <FormGroup sx={{ gap: 3 }}>
        <FormControl>
          <Typography variant="subtitle2" gutterBottom>
            Theme
          </Typography>
          <Select
            value={theme}
            onChange={(e) => setTheme(e.target.value as typeof theme)}
            size="small"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="system">System</MenuItem>
          </Select>
          <FormHelperText>Choose your preferred theme</FormHelperText>
        </FormControl>

        <FormControl>
          <Typography variant="subtitle2" gutterBottom>
            Language
          </Typography>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} size="small">
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
          <FormHelperText>Select your preferred language</FormHelperText>
        </FormControl>

        <FormControl>
          <Typography variant="subtitle2" gutterBottom>
            Timezone
          </Typography>
          <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} size="small">
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="EST">Eastern Time</MenuItem>
            <MenuItem value="PST">Pacific Time</MenuItem>
          </Select>
          <FormHelperText>Set your local timezone</FormHelperText>
        </FormControl>

        <FormControl>
          <Typography variant="subtitle2" gutterBottom>
            Date Format
          </Typography>
          <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} size="small">
            <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
            <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
            <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
          </Select>
          <FormHelperText>Choose how dates should be displayed</FormHelperText>
        </FormControl>
      </FormGroup>
    </Box>
  )
}
