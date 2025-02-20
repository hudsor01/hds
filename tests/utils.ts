import { type Page } from '@playwright/test'

// Helper to generate unique test emails
export const generateTestEmail = () =>
    `test-${Date.now()}@example.com`

// Helper to wait for navigation and network idle
export async function waitForLoadState(page: Page) {
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.waitForLoadState('domcontentloaded')
    ])
}

// Helper to test form validations
export async function testFormValidation(
    page: Page,
    fieldSelector: string,
    errorMessage: string
) {
    await page.click('button[type="submit"]')
    const errorText = await page.textContent(
        `${fieldSelector} + .MuiFormHelperText-root`
    )
    return errorText?.includes(errorMessage)
}

// Helper to fill auth form
export async function fillAuthForm(
    page: Page,
    email: string,
    password: string
) {
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', password)
}

// Helper to check for valid navigation after auth
export async function checkAuthNavigation(
    page: Page,
    expectedPath: string
) {
    await page.waitForURL(url => url.pathname === expectedPath)
    const currentPath = new URL(page.url()).pathname
    return currentPath === expectedPath
}
