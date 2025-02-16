// components/settings/profile-section.tsx
'use client'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Input } from '@/components/input'
import React, { useState } from 'react'
import { toast } from 'sonner'

// components/settings/profile-section.tsx

// components/settings/profile-section.tsx

// components/settings/profile-section.tsx

// Define the skeleton component
function ProfileSectionSkeleton() {
  return (
    <Card className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
        <div className="h-4 w-2/3 rounded bg-gray-300"></div>
      </div>
    </Card>
  )
}

export function ProfileSection() {
  const { user, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    phoneNumber: user?.phoneNumbers[0]?.phoneNumber || ''
  })

  if (!isLoaded) {
    return <ProfileSectionSkeleton />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName
      })

      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input id="email" name="email" type="email" value={formData.email} disabled className="mt-1 bg-gray-50" />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
