'use client'

import { UserProfile } from '@/components/auth/user-profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences()
  const [activeTab, setActiveTab] = useState('profile')

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Property Manager',
    lastLogin: new Date(),
    avatar: '/placeholder-avatar.jpg'
  }

  const handleThemeChange = async (theme: 'light' | 'dark' | 'system') => {
    try {
      await updatePreferences({ theme })
      toast.success('Theme updated successfully')
    } catch (error) {
      toast.error(`Failed to update theme: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleNotificationChange = async (key: keyof typeof preferences.notifications, value: boolean) => {
    try {
      await updatePreferences({
        notifications: {
          ...preferences.notifications,
          [key]: value,
        },
      })
      toast.success('Notification preferences updated')
    } catch (error) {
      toast.error(`Failed to update notification preferences: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleLanguageChange = async (language: string) => {
    try {
      await updatePreferences({ language })
      toast.success('Language updated successfully')
    } catch (error) {
      toast.error(`Failed to update language: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UserProfile user={user} />
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={preferences.theme} onValueChange={handleThemeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={preferences.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={preferences.notifications.email}
                  onCheckedChange={(checked: boolean) => handleNotificationChange('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={preferences.notifications.push}
                  onCheckedChange={(checked: boolean) => handleNotificationChange('push', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="security-notifications">Security Alerts</Label>
                <Switch
                  id="security-notifications"
                  checked={preferences.notifications.security}
                  onCheckedChange={(checked: boolean) => handleNotificationChange('security', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
