'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const roleSchema = z.object({
  role: z.enum(['admin', 'moderator', 'user']).nullable(),
  userId: z.string().uuid()
})

async function validateAdmin(): Promise<{ id: string }> {
  const supabase = createClient()
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error('Authentication failed')
  }

  if (!user || user.user_metadata['role'] !== 'admin') {
    throw new Error('Unauthorized access')
  }

  return user
}

export async function setRole(formData: FormData) {
  const validatedFields = roleSchema.safeParse({
    role: formData.get('role'),
    userId: formData.get('id')
  })

  if (!validatedFields.success) {
    throw new Error('Invalid input data')
  }

  await validateAdmin()
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('users')
      .update({ role: validatedFields.data.role })
      .eq('id', validatedFields.data.userId)
      .single()

    if (error) throw error

    revalidatePath('/admin')
  } catch (error) {
    console.error('Failed to set role:', error)
    throw new Error('Failed to update user role')
  }
}

export async function removeRole(formData: FormData) {
  const userId = formData.get('id')
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID')
  }

  await validateAdmin()
  const supabase = createClient()

  try {
    const { error } = await supabase.from('users').update({ role: null }).eq('id', userId).single()

    if (error) throw error

    revalidatePath('/admin')
  } catch (error) {
    console.error('Failed to remove role:', error)
    throw new Error('Failed to remove user role')
  }
}
