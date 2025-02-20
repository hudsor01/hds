import { createClient } from '@supabase/supabase-js'
import type { Page } from '@playwright/test'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function signIn(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.waitForLoadState('networkidle')
  
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /sign in/i }).click()
  
  // Wait for navigation to complete
  await page.waitForURL(/.*dashboard/, { timeout: 10000 })
}

export async function signOut(page: Page) {
  await page.getByRole('button', { name: /menu/i }).click()
  await page.getByRole('menuitem', { name: /sign out/i }).click()
  
  // Wait for redirect to login
  await page.waitForURL(/.*login/)
}

export async function cleanupTestUser(email: string) {
  try {
    const { data: { users }, error: searchError } = await supabase.auth.admin.listUsers({
      filters: {
        email: email
      }
    })

    if (searchError) {
      console.warn('Error searching for test user:', searchError)
      return
    }

    if (users?.length > 0) {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        users[0].id
      )

      if (deleteError) {
        console.warn('Error deleting test user:', deleteError)
      }
    }
  } catch (error) {
    console.error('Error cleaning up test user:', error)
  }
}