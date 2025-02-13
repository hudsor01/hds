'use server'

import { createClient } from '@supabase/ssr'
import { checkRole } from '@/utils/roles'

export async function setRole(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getSession()

  if (!checkRole(user?.email, 'admin')) {
    throw new Error('Not Authorized')
  }

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
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getSession()

  if (!checkRole(user?.email, 'admin')) {
    throw new Error('Not Authorized')
  }

  try {
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: null })
      .eq('id', formData.get('id'))

    if (updateError) throw updateError
  } catch {
    throw new Error('Failed to remove role')
  }
}
