import { createClient } from '@supabase/supabase-js'
import { test as setup } from '@playwright/test'

async function globalSetup() {
    // Create Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Clean up test users
    const { data: users, error } =
        await supabase.auth.admin.listUsers({
            perPage: 100
        })

    if (error) {
        console.error('Error listing users:', error)
        return
    }

    // Delete test users
    for (const user of users.users) {
        if (
            user.email?.includes('test-') ||
            user.email?.includes('@example.com')
        ) {
            await supabase.auth.admin.deleteUser(user.id)
        }
    }
}

export default globalSetup
