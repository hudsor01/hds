'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { AccountCircle, Email, Phone } from '@mui/icons-material'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/lib/auth/auth-provider'

export default function AccountPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    avatarUrl: '',
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error

      if (profile) {
        setProfile({
          fullName: profile.full_name || '',
          phone: profile.phone || '',
          avatarUrl: profile.avatar_url || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch profile. Please try again.',
        variant: 'destructive',
      })
    }
  }

  async function handleProfileUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert([
          {
            id: user?.id,
            full_name: profile.fullName,
            phone: profile.phone,
            avatar_url: profile.avatarUrl,
            updated_at: new Date().toISOString(),
          }
        ])

      if (error) throw error

      toast({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Account</h1>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AccountCircle className="h-5 w-5" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>
              Update your account profile and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Email className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
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