'use client'

import {
    Box,
    FormControl,
    FormGroup,
    FormHelperText,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import { useState } from 'react'

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY'
  })

  const handleChange = (field: keyof typeof settings) => (event: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

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
            value={settings.theme}
            onChange={handleChange('theme')}
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
          <Select
            value={settings.language}
            onChange={handleChange('language')}
            size="small"
          >
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
          <Select
            value={settings.timezone}
            onChange={handleChange('timezone')}
            size="small"
          >
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
          <Select
            value={settings.dateFormat}
            onChange={handleChange('dateFormat')}
            size="small"
          >
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
