'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/Card/card'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Settings, NotificationsSetting } from '@mui/icons-material'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false
  })

  async function handleSettingsUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from('user_settings').upsert([
        {
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...settings,
          updated_at: new Date().toISOString()
        }
      ])

      if (error) throw error

      toast({
        title: 'Settings updated',
        description: 'Your settings have been saved successfully.'
      })
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSettingsUpdate} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <NotificationsSetting className="h-5 w-5" />
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={checked => {
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }}
                  />
                </div>
                <p className="text-muted-foreground text-sm">Receive email notifications about your account activity</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <NotificationsSetting className="h-5 w-5" />
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={checked => {
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }}
                  />
                </div>
                <p className="text-muted-foreground text-sm">Receive push notifications about important updates</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <NotificationsSetting className="h-5 w-5" />
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.marketingEmails}
                    onCheckedChange={checked => {
                      setSettings(prev => ({ ...prev, marketingEmails: checked }))
                    }}
                  />
                </div>
                <p className="text-muted-foreground text-sm">Receive emails about new features and updates</p>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
