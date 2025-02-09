'use server'

import { checkRole } from '@/utils/roles'

export async function setRole(formData: FormData): Promise<void> {
  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    throw new Error('Not Authorized')
  }

  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
  } catch (err) {
    throw new Error('Failed to set role')
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    })
  } catch (err) {
    throw new Error('Failed to remove role')
  }
}
