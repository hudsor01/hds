import { test, expect } from '@playwright/test'

test.describe('Basic website functionality', () => {
    test('Home page loads correctly', async ({ page }) => {
        console.log('Starting home page test...')

        // Go to the homepage
        console.log('Navigating to homepage...')
        await page.goto('/')

        // Wait for page to be fully loaded
        console.log('Waiting for page to load...')
        await page.waitForLoadState('networkidle')

        // Check for main heading
        console.log('Checking main heading...')
        const heading = await page.textContent('h1')
        console.log('Found heading:', heading)
        expect(heading).toContain('Welcome to Property Manager')

        // Check navbar
        console.log('Checking navbar...')
        const navbarBrand = await page.textContent('nav a')
        console.log('Found navbar brand:', navbarBrand)
        expect(navbarBrand).toContain('Property Manager')

        // Check theme toggle exists
        console.log('Checking theme toggle...')
        const themeButton = await page.$(
            'button[aria-label="Toggle theme"]'
        )
        expect(themeButton).toBeTruthy()

        // Take a screenshot
        console.log('Taking screenshot...')
        await page.screenshot({
            path: 'test-results/homepage.png',
            fullPage: true
        })

        console.log('Test completed successfully!')
    })
})
