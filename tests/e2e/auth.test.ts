import { test, expect } from '@playwright/test'
import { signIn, signOut, cleanupTestUser } from '../helpers/auth'

test.describe('Authentication', () => {
  const testEmail = `test${Date.now()}@example.com`
  const testPassword = 'Test123!@#'

  test.afterAll(async () => {
    await cleanupTestUser(testEmail)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    // Ensure page is loaded
    await page.waitForLoadState('networkidle')
  })

  test('should display login form with validation', async ({ page }) => {
    // Wait for the form to be visible
    await page.waitForSelector('form', { state: 'visible' })
    
    // Check form elements exist
    const emailInput = page.getByLabel('Email')
    const passwordInput = page.getByLabel('Password')
    const submitButton = page.getByRole('button', { name: /sign in/i })

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()

    // Test empty form submission
    await submitButton.click()
    await expect(page.getByText(/required/i)).toBeVisible()
  })

  test('should handle login errors correctly', async ({ page }) => {
    // Fill form with invalid credentials
    await page.getByLabel('Email').fill('nonexistent@example.com')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: /sign in/i }).click()

    // Check for error message
    await expect(page.getByRole('alert')).toBeVisible()
  })

  test('should navigate to sign up page', async ({ page }) => {
    // Click sign up link
    await page.getByRole('link', { name: /sign up/i }).click()
    
    // Check URL
    await expect(page).toHaveURL(/.*signup/)
    
    // Check form elements on sign up page
    await expect(page.getByRole('heading', { name: /create.*account/i })).toBeVisible()
  })

  test('should handle forgot password flow', async ({ page }) => {
    // Click forgot password link
    await page.getByRole('link', { name: /forgot password/i }).click()
    
    // Check URL
    await expect(page).toHaveURL(/.*forgot-password/)
    
    // Fill in email
    await page.getByLabel('Email').fill(testEmail)
    await page.getByRole('button', { name: /reset/i }).click()
    
    // Check for success message
    await expect(page.getByText(/email.*sent/i)).toBeVisible()
  })

  test('should maintain auth state after refresh', async ({ page }) => {
    // Sign in using helper
    await signIn(page, testEmail, testPassword)
    
    // Verify we're on dashboard
    await expect(page).toHaveURL(/.*dashboard/)
    
    // Refresh page
    await page.reload()
    
    // Should still be on dashboard
    await expect(page).toHaveURL(/.*dashboard/)
  })

  test('should prevent access to protected routes when logged out', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/dashboard')
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/)
  })

  test('should handle sign out correctly', async ({ page }) => {
    // First sign in
    await signIn(page, testEmail, testPassword)
    
    // Then sign out using helper
    await signOut(page)
    
    // Try accessing dashboard after logout
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/.*login/)
  })

  test('should redirect to requested page after login', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/dashboard/settings')
    
    // Should be redirected to login with redirect parameter
    await expect(page).toHaveURL(/.*login.*redirect.*settings/)
    
    // Login
    await signIn(page, testEmail, testPassword)
    
    // Should be redirected to the originally requested URL
    await expect(page).toHaveURL(/.*settings/)
  })
})