import { test, expect } from '@playwright/test'
import {
    generateTestEmail,
    waitForLoadState,
    testFormValidation,
    fillAuthForm,
    checkAuthNavigation
} from './utils'
import { test as authTest } from './auth-fixture'

test.describe('Authentication Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should validate signup form fields', async ({ page }) => {
        await page.goto('/signup')
        await waitForLoadState(page)

        // Test empty form submission
        await page.click('button[type="submit"]')
        await expect(
            page.getByText(/first name must be/i)
        ).toBeVisible()
        await expect(
            page.getByText(/last name must be/i)
        ).toBeVisible()
        await expect(page.getByText(/invalid email/i)).toBeVisible()
        await expect(
            page.getByText(/password must be/i)
        ).toBeVisible()

        // Test invalid email
        await page.fill('input[name="email"]', 'invalid-email')
        await expect(page.getByText(/invalid email/i)).toBeVisible()

        // Test password requirements
        await page.fill('input[name="password"]', 'weak')
        await expect(
            page.getByText(/password must contain/i)
        ).toBeVisible()
    })

    test('should handle successful signup flow', async ({ page }) => {
        const testEmail = generateTestEmail()

        await page.goto('/signup')
        await waitForLoadState(page)

        // Fill signup form
        await page.fill('input[name="firstName"]', 'Test')
        await page.fill('input[name="lastName"]', 'User')
        await page.fill('input[name="email"]', testEmail)
        await page.fill('input[name="password"]', 'TestPassword123!')
        await page.fill(
            'input[name="confirmPassword"]',
            'TestPassword123!'
        )
        await page.click('input[name="acceptTerms"]')

        // Submit form
        await page.click('button[type="submit"]')

        // Verify redirect to email verification page
        await expect(
            page.getByText(/verification email/i)
        ).toBeVisible()
    })

    test('should handle login with invalid credentials', async ({
        page
    }) => {
        await page.goto('/login')
        await waitForLoadState(page)

        await fillAuthForm(page, 'wrong@example.com', 'wrongpassword')
        await page.click('button[type="submit"]')

        await expect(
            page.getByText(/invalid credentials/i)
        ).toBeVisible()
    })

    authTest(
        'should allow access to protected routes when authenticated',
        async ({ authenticatedPage }) => {
            await authenticatedPage.goto('/dashboard')
            await waitForLoadState(authenticatedPage)

            // Verify we're on the dashboard
            const currentUrl = authenticatedPage.url()
            expect(currentUrl).toContain('/dashboard')
        }
    )

    test('should handle forgot password flow', async ({ page }) => {
        await page.goto('/forgot-password')
        await waitForLoadState(page)

        const testEmail = generateTestEmail()
        await page.fill('input[name="email"]', testEmail)
        await page.click('button[type="submit"]')

        // Verify success message
        await expect(page.getByText(/reset link/i)).toBeVisible()
    })

    test('should redirect unauthenticated users from protected routes', async ({
        page
    }) => {
        await page.goto('/dashboard')
        await waitForLoadState(page)

        // Should redirect to login
        await expect(page).toHaveURL(/.*login/)
    })
})

test.describe('Public Pages', () => {
    test('should render all public pages correctly', async ({
        page
    }) => {
        const publicPages = [
            '/',
            '/about',
            '/features',
            '/pricing',
            '/contact'
        ]

        for (const path of publicPages) {
            await page.goto(path)
            await waitForLoadState(page)

            // Verify page loads without errors
            const errorMessage = await page.$(
                'text=/error|exception/i'
            )
            expect(errorMessage).toBeNull()

            // Verify main content is visible
            const mainContent = await page.$('main')
            expect(mainContent).toBeTruthy()
        }
    })
})
