'use client'

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
    deviceHistory: true
  })

  const handleSwitchChange = (field: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const handleNumberChange = (field: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value)) {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Security Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your security preferences and account protection
      </Typography>

      <FormGroup sx={{ gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Two-Factor Authentication
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={settings.twoFactor} onChange={handleSwitchChange('twoFactor')} />}
                label="Enable two-factor authentication"
              />
            </FormGroup>
            <FormHelperText>Add an extra layer of security to your account</FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Session Management
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Session Timeout (minutes)"
              type="number"
              value={settings.sessionTimeout}
              onChange={handleNumberChange('sessionTimeout')}
              size="small"
              inputProps={{ min: 5, max: 120 }}
            />
            <FormHelperText>Automatically log out after period of inactivity</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Password Expiry (days)"
              type="number"
              value={settings.passwordExpiry}
              onChange={handleNumberChange('passwordExpiry')}
              size="small"
              inputProps={{ min: 30, max: 365 }}
            />
            <FormHelperText>Require password change after specified period</FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Login Notifications
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={settings.loginNotifications} onChange={handleSwitchChange('loginNotifications')} />}
                label="Notify me of new login attempts"
              />
              <FormControlLabel
                control={<Switch checked={settings.deviceHistory} onChange={handleSwitchChange('deviceHistory')} />}
                label="Keep device login history"
              />
            </FormGroup>
            <FormHelperText>Get notified about account access and maintain device history</FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary">
            Save Security Settings
          </Button>
          <Button variant="outlined" color="error" sx={{ ml: 2 }}>
            Reset to Defaults
          </Button>
        </Box>
      </FormGroup>
    </Box>
  )
}
