'use server'

import { createClient } from '@/utils/supabase/server'
import { checkRole } from '@/utils/roles'
import { MESSAGES } from '@/lib/messages'
import { z } from 'zod'

const roleSchema = z.object({
  role: z.enum(['admin', 'user', 'manager']).nullable(),
  userId: z.string().uuid()
})

async function validateAdmin(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user }
  } = await supabase.auth.getSession()
  if (!checkRole(user?.email, 'admin')) {
    throw new Error(MESSAGES.ERRORS.UNAUTHORIZED)
  }
  return user
}

export async function setRole(formData: FormData): Promise<void> {
  const supabase = createClient()

  const validated = roleSchema.safeParse({
    role: formData.get('role'),
    userId: formData.get('id')
  })

  if (!validated.success) {
    throw new Error(MESSAGES.ERRORS.INVALID_INPUT)
  }

  await validateAdmin(supabase)

  try {
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: formData.get('role') })
      .eq('id', formData.get('id'))

    if (updateError) throw updateError
  } catch {
    throw new Error('Failed to set role')
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const supabase = createClient()

  await validateAdmin(supabase)

  try {
    const { error: updateError } = await supabase.from('users').update({ role: null }).eq('id', formData.get('id'))

    if (updateError) throw updateError
  } catch {
    throw new Error(MESSAGES.ERRORS.SERVER_ERROR)
  }
}
