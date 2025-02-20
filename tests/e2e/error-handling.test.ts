import { test, expect } from '@playwright/test'

test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({
        page
    }) => {
        // Mock failed API response
        await page.route('**/api/**', route => {
            route.abort('failed')
        })

        await page.goto('/dashboard')

        // Should show error message
        const errorMessage = await page.textContent('[role="alert"]')
        expect(errorMessage).toBeTruthy()
    })

    test('should show 404 page for non-existent routes', async ({
        page
    }) => {
        await page.goto('/non-existent-page')

        // Should show 404 message
        const notFoundMessage = await page.textContent('h1')
        expect(notFoundMessage).toContain('404')
    })

    test('should handle auth errors appropriately', async ({
        page
    }) => {
        // Try to access protected route without auth
        await page.goto('/dashboard')

        // Should redirect to login
        expect(page.url()).toContain('/login')

        // Should show message about requiring login
        const message = await page.textContent('text=Please login')
        expect(message).toBeTruthy()
    })
})
