import { test, expect } from '@playwright/test'

test.describe('Loading States', () => {
    test('should show loading states during navigation', async ({
        page
    }) => {
        // Go to home page
        await page.goto('/')

        // Click a link that triggers loading state
        await Promise.all([
            page.click('a[href="/features"]'),
            // Check for loading indicator
            page.waitForSelector('[role="progressbar"]')
        ])

        // Verify page loaded
        const heading = await page.textContent('h1')
        expect(heading).toContain('Features')
    })

    test('should show loading states during data fetching', async ({
        page
    }) => {
        // Artificially delay API response
        await page.route('**/api/**', async route => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            await route.continue()
        })

        await page.goto('/dashboard')

        // Should show loading skeleton
        const skeleton = await page.locator('.animate-pulse').first()
        expect(await skeleton.isVisible()).toBeTruthy()
    })

    test('should handle slow connections gracefully', async ({
        page
    }) => {
        // Simulate slow 3G
        await page.emulateNetworkConditions({
            downloadThroughput: (380 * 1024) / 8,
            uploadThroughput: (100 * 1024) / 8,
            latency: 200
        })

        await page.goto('/')

        // Should show loading indicators
        const progressBar = await page.locator('[role="progressbar"]')
        expect(await progressBar.isVisible()).toBeTruthy()
    })
})
