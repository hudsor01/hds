'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/auth'

const profileSchema = z.object({
    fullName: z.string().min(1).max(100),
    avatarUrl: z.string().url().optional().nullable()
})

const settingsSchema = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    marketingEmails: z.boolean()
})

export async function updateUserProfile(formData: FormData) {
    const validatedFields = profileSchema.safeParse({
        fullName: formData.get('fullName'),
        avatarUrl: formData.get('avatarUrl')
    })

    if (!validatedFields.success) {
        throw new Error('Invalid form data')
    }

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    if (!user) {
        throw new Error('User not found')
    }

    const updates = {
        full_name: formData.get('fullName'),
        avatar_url: formData.get('avatarUrl'),
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

    if (error) throw error

    revalidatePath('/account')
    redirect('/account')
}

export async function updateAccountSettings(formData: FormData) {
    const validatedFields = settingsSchema.safeParse({
        emailNotifications:
            formData.get('emailNotifications') === 'on',
        pushNotifications: formData.get('pushNotifications') === 'on',
        marketingEmails: formData.get('marketingEmails') === 'on'
    })

    if (!validatedFields.success) {
        throw new Error('Invalid form data')
    }

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser()
    if (userError) throw userError

    if (!user) {
        throw new Error('User not found')
    }

    const updates = {
        email_notifications:
            formData.get('emailNotifications') === 'on',
        push_notifications:
            formData.get('pushNotifications') === 'on',
        marketing_emails: formData.get('marketingEmails') === 'on',
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', user.id)

    if (error) throw error

    revalidatePath('/settings')
    redirect('/settings')
}

export async function deleteAccount() {
    try {
        const { error: deleteError } =
            await supabase.auth.admin.deleteUser(
                (await supabase.auth.getUser()).data.user?.id ?? ''
            )

        if (deleteError) throw deleteError

        redirect('/sign-in')
    } catch {
        throw new Error('Failed to delete account. Please try again.')
    }
}
