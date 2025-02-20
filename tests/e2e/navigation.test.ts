import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should navigate between public pages', async ({ page }) => {
        // Define public pages to test
        const publicPages = [
            { path: '/', title: 'Welcome to Property Manager' },
            { path: '/about', title: 'About Us' },
            { path: '/features', title: 'Features' },
            { path: '/pricing', title: 'Pricing' },
            { path: '/contact', title: 'Contact Us' }
        ]

        // Test navigation to each page
        for (const { path, title } of publicPages) {
            // Navigate to page
            await page.goto(path)
            await page.waitForLoadState('networkidle')

            // Verify correct page loaded
            const pageTitle = await page.textContent('h1')
            expect(pageTitle).toContain(title)

            // Verify navbar is present
            const navbar = await page.$('nav')
            expect(navbar).toBeTruthy()

            // Take screenshot of each page
            await page.screenshot({
                path: `test-results/navigation-${path.replace('/', '-')}.png`,
                fullPage: true
            })
        }
    })

    test('should preserve theme across navigation', async ({
        page
    }) => {
        // Enable dark mode
        await page.click('button[aria-label="Toggle theme"]')
        await page.waitForTimeout(500) // Wait for theme transition

        // Check dark mode is applied
        const isDark = await page.evaluate(() => {
            return document.documentElement.classList.contains('dark')
        })
        expect(isDark).toBeTruthy()

        // Navigate to another page
        await page.click('a[href="/features"]')
        await page.waitForLoadState('networkidle')

        // Verify dark mode persisted
        const isDarkAfterNav = await page.evaluate(() => {
            return document.documentElement.classList.contains('dark')
        })
        expect(isDarkAfterNav).toBeTruthy()
    })
})
