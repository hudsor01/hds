'use client'

import { api } from '@/lib/api'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const { data: userSettings } = useQuery({
    queryKey: ['settings', 'user'],
    queryFn: () => api.get('/api/settings?type=user')
  })

  const { data: securitySettings } = useQuery({
    queryKey: ['settings', 'security'],
    queryFn: () => api.get('/api/settings?type=security')
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleUserSettingsSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.target as HTMLFormElement)
      const data = {
        theme: formData.get('theme'),
        language: formData.get('language'),
        currency: formData.get('currency'),
        date_format: formData.get('date_format'),
        time_format: formData.get('time_format'),
        notifications_enabled: formData.get('notifications_enabled') === 'true',
        email_notifications: formData.get('email_notifications') === 'true',
        sms_notifications: formData.get('sms_notifications') === 'true'
      }

      await api.put('/api/settings', 'user', data)
      toast.success('User settings updated successfully')
    } catch (error) {
      console.error('Error updating user settings:', error)
      toast.error('Failed to update user settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSecuritySettingsSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.target as HTMLFormElement)
      const data = {
        two_factor_enabled: formData.get('two_factor_enabled') === 'true',
        two_factor_method: formData.get('two_factor_method'),
        max_sessions: parseInt(formData.get('max_sessions') as string, 10),
        login_notifications: formData.get('login_notifications') === 'true'
      }

      await api.put('/api/settings', 'security', data)
      toast.success('Security settings updated successfully')
    } catch (error) {
      console.error('Error updating security settings:', error)
      toast.error('Failed to update security settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="User Settings" />
          <Tab label="Security Settings" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <form onSubmit={handleUserSettingsSubmit}>
              <div className="grid gap-6">
                <TextField name="theme" label="Theme" select fullWidth defaultValue={userSettings?.data?.theme || 'light'}>
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </TextField>

                <TextField name="language" label="Language" select fullWidth defaultValue={userSettings?.data?.language || 'en'}>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </TextField>

                <TextField name="currency" label="Currency" select fullWidth defaultValue={userSettings?.data?.currency || 'USD'}>
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                </TextField>

                <TextField
                  name="date_format"
                  label="Date Format"
                  select
                  fullWidth
                  defaultValue={userSettings?.data?.date_format || 'MM/DD/YYYY'}
                >
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                </TextField>

                <TextField
                  name="time_format"
                  label="Time Format"
                  select
                  fullWidth
                  defaultValue={userSettings?.data?.time_format || '12h'}
                >
                  <MenuItem value="12h">12-hour</MenuItem>
                  <MenuItem value="24h">24-hour</MenuItem>
                </TextField>

                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch name="notifications_enabled" defaultChecked={userSettings?.data?.notifications_enabled} />}
                      label="Enable Notifications"
                    />
                    <FormControlLabel
                      control={<Switch name="email_notifications" defaultChecked={userSettings?.data?.email_notifications} />}
                      label="Email Notifications"
                    />
                    <FormControlLabel
                      control={<Switch name="sms_notifications" defaultChecked={userSettings?.data?.sms_notifications} />}
                      label="SMS Notifications"
                    />
                  </FormGroup>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                    }
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <form onSubmit={handleSecuritySettingsSubmit}>
              <div className="grid gap-6">
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch name="two_factor_enabled" defaultChecked={securitySettings?.data?.two_factor_enabled} />}
                      label="Enable Two-Factor Authentication"
                    />
                  </FormGroup>
                </FormControl>

                <TextField
                  name="two_factor_method"
                  label="Two-Factor Method"
                  select
                  fullWidth
                  defaultValue={securitySettings?.data?.two_factor_method || 'EMAIL'}
                  disabled={!securitySettings?.data?.two_factor_enabled}
                >
                  <MenuItem value="EMAIL">Email</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                  <MenuItem value="AUTHENTICATOR">Authenticator App</MenuItem>
                </TextField>

                <TextField
                  name="max_sessions"
                  label="Maximum Active Sessions"
                  type="number"
                  fullWidth
                  defaultValue={securitySettings?.data?.max_sessions || 5}
                  inputProps={{ min: 1, max: 10 }}
                />

                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch name="login_notifications" defaultChecked={securitySettings?.data?.login_notifications} />}
                      label="Login Notifications"
                    />
                  </FormGroup>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                    }
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabPanel>
    </div>
  )
}
