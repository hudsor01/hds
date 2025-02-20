import { test as base, type Page } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

// Extend Playwright test fixture with auth and Supabase client
type AuthFixture = {
    authenticatedPage: Page
    supabaseClient: ReturnType<typeof createClient>
}

// Custom fixture for authenticated page
export const test = base.extend<AuthFixture>({
    authenticatedPage: async ({ page }, use) => {
        // Create Supabase client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Create a test user
        const email = `test-${Date.now()}@example.com`
        const password = 'TestPassword123!'

        const { data: authData, error: authError } =
            await supabase.auth.signUp({
                email,
                password
            })

        if (authError) throw authError

        // Set auth cookie
        if (authData.session) {
            await page.context().addCookies([
                {
                    name: 'sb-access-token',
                    value: authData.session.access_token,
                    domain: 'localhost',
                    path: '/'
                },
                {
                    name: 'sb-refresh-token',
                    value: authData.session.refresh_token!,
                    domain: 'localhost',
                    path: '/'
                }
            ])
        }

        await use(page)

        // Cleanup: Delete test user
        if (authData.user) {
            await supabase.auth.admin.deleteUser(authData.user.id)
        }
    },

    supabaseClient: async ({}, use) => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        await use(supabase)
    }
})
