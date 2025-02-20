import { test, expect } from '@playwright/test'

test.describe('User Interactions', () => {
    test('should handle theme switching correctly', async ({
        page
    }) => {
        await page.goto('/')

        // Default theme
        const initialTheme = await page.evaluate(() => {
            return document.documentElement.classList.contains('dark')
        })

        // Toggle theme
        await page.click('button[aria-label="Toggle theme"]')
        await page.waitForTimeout(500) // Wait for transition

        const newTheme = await page.evaluate(() => {
            return document.documentElement.classList.contains('dark')
        })
        expect(newTheme).not.toBe(initialTheme)
    })

    test('should have working form interactions', async ({
        page
    }) => {
        await page.goto('/contact')

        // Fill form
        await page.fill('input[name="name"]', 'Test User')
        await page.fill('input[name="email"]', 'test@example.com')
        await page.fill('textarea[name="message"]', 'Test message')

        // Submit form
        await page.click('button[type="submit"]')

        // Check success message
        const successMessage = await page.textContent('.text-success')
        expect(successMessage).toBeTruthy()
    })

    test('should handle keyboard navigation', async ({ page }) => {
        await page.goto('/')

        // Tab through navigation
        await page.keyboard.press('Tab')

        // Check focus states
        const focusedElement = await page.evaluate(() => {
            return document.activeElement?.tagName.toLowerCase()
        })
        expect(focusedElement).toBe('a')
    })

    test('should handle mobile menu interactions', async ({
        page
    }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        // Open mobile menu
        await page.click('button[aria-label="Menu"]')

        // Check menu items are visible
        const menuItems = await page.locator('nav a').all()
        for (const item of menuItems) {
            expect(await item.isVisible()).toBeTruthy()
        }
    })
})
