'use client'

import {
    Box,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Switch,
    Typography
} from '@mui/material'
import { useState } from 'react'

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: {
      marketing: true,
      security: true,
      updates: false
    },
    push: {
      newMessages: true,
      newActivity: true,
      reminders: true
    },
    desktop: {
      alerts: true,
      sounds: true
    }
  })

  const handleChange = (category: keyof typeof settings, setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: event.target.checked
      }
    }))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose how you want to be notified about activity
      </Typography>

      <FormGroup sx={{ gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Email Notifications
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.email.marketing}
                    onChange={handleChange('email', 'marketing')}
                  />
                }
                label="Marketing emails"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.email.security}
                    onChange={handleChange('email', 'security')}
                  />
                }
                label="Security alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.email.updates}
                    onChange={handleChange('email', 'updates')}
                  />
                }
                label="Product updates"
              />
            </FormGroup>
            <FormHelperText>Receive notifications via email</FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Push Notifications
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.push.newMessages}
                    onChange={handleChange('push', 'newMessages')}
                  />
                }
                label="New messages"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.push.newActivity}
                    onChange={handleChange('push', 'newActivity')}
                  />
                }
                label="Activity updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.push.reminders}
                    onChange={handleChange('push', 'reminders')}
                  />
                }
                label="Reminders"
              />
            </FormGroup>
            <FormHelperText>Receive push notifications on your device</FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Desktop Notifications
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.desktop.alerts}
                    onChange={handleChange('desktop', 'alerts')}
                  />
                }
                label="Desktop alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.desktop.sounds}
                    onChange={handleChange('desktop', 'sounds')}
                  />
                }
                label="Notification sounds"
              />
            </FormGroup>
            <FormHelperText>Configure desktop notification preferences</FormHelperText>
          </FormControl>
        </Box>
      </FormGroup>
    </Box>
  )
}
