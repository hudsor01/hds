import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should allow user to sign up', async ({ page }) => {
        await page.goto('/signup')

        const email = `test${Date.now()}@example.com`
        const password = 'TestPassword123!'

        await page.fill('input[name="email"]', email)
        await page.fill('input[name="password"]', password)
        await page.fill('input[name="confirmPassword"]', password)
        await page.fill('input[name="firstName"]', 'Test')
        await page.fill('input[name="lastName"]', 'User')
        await page.click('input[name="acceptTerms"]')

        await page.click('button[type="submit"]')

        // Should show verification message
        await expect(
            page.getByText(/verification email/i)
        ).toBeVisible()
    })

    test('should allow user to login', async ({ page }) => {
        await page.goto('/login')

        await page.fill('input[name="email"]', 'test@example.com')
        await page.fill('input[name="password"]', 'password123')

        await page.click('button[type="submit"]')

        // Should redirect to dashboard
        await expect(page).toHaveURL('/dashboard')
    })

    test('should handle forgot password flow', async ({ page }) => {
        await page.goto('/forgot-password')

        await page.fill('input[name="email"]', 'test@example.com')
        await page.click('button[type="submit"]')

        // Should show success message
        await expect(page.getByText(/reset link/i)).toBeVisible()
    })

    test('should handle invalid login', async ({ page }) => {
        await page.goto('/login')

        await page.fill('input[name="email"]', 'wrong@example.com')
        await page.fill('input[name="password"]', 'wrongpassword')

        await page.click('button[type="submit"]')

        // Should show error message
        await expect(
            page.getByText(/invalid credentials/i)
        ).toBeVisible()
    })

    test('should require email verification', async ({ page }) => {
        await page.goto('/signup')

        const email = `test${Date.now()}@example.com`
        await page.fill('input[name="email"]', email)
        await page.fill('input[name="password"]', 'Password123!')
        await page.fill(
            'input[name="confirmPassword"]',
            'Password123!'
        )
        await page.fill('input[name="firstName"]', 'Test')
        await page.fill('input[name="lastName"]', 'User')
        await page.click('input[name="acceptTerms"]')

        await page.click('button[type="submit"]')

        // Try to access dashboard without verification
        await page.goto('/dashboard')

        // Should redirect to verification page
        await expect(page).toHaveURL('/login')
    })
})
