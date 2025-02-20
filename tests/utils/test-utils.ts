import { Page, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import fs from 'fs'

// Supabase client for test data management
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Helper to create test users
export async function createTestUser(userData: any) {
    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
            data: {
                first_name: userData.firstName,
                last_name: userData.lastName,
                role: userData.role
            }
        }
    })

    if (error) throw error
    return data
}

// Helper to clean up test users
export async function cleanupTestUser(email: string) {
    const {
        data: { user }
    } = await supabase.auth.admin.getUserByEmail(email)
    if (user) {
        await supabase.auth.admin.deleteUser(user.id)
    }
}

// Helper for visual regression testing
export async function compareScreenshots(
    testScreenshot: string,
    baselineScreenshot: string,
    diffOutputPath: string,
    threshold = 0.1
): Promise<number> {
    const test = PNG.sync.read(fs.readFileSync(testScreenshot))
    const baseline = PNG.sync.read(
        fs.readFileSync(baselineScreenshot)
    )
    const diff = new PNG({ width: test.width, height: test.height })

    const numDiffPixels = pixelmatch(
        test.data,
        baseline.data,
        diff.data,
        test.width,
        test.height,
        { threshold }
    )

    fs.writeFileSync(diffOutputPath, PNG.sync.write(diff))
    return numDiffPixels
}

// Helper to wait for loading states
export async function waitForLoadingComplete(page: Page) {
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    const spinner = page.locator('[role="progressbar"]')
    if (await spinner.isVisible())
        await spinner.waitFor({ state: 'hidden' })
}

// Helper to check accessibility
export async function checkA11y(page: Page) {
    const violations = await page.evaluate(async () => {
        // @ts-ignore
        const { axe } = await import('@axe-core/playwright')
        const results = await axe(document)
        return results.violations
    })

    expect(violations.length).toBe(0)
}

// Helper to simulate different network conditions
export async function simulateNetwork(
    page: Page,
    condition: 'slow3G' | 'fast3G' | 'offline'
) {
    const conditions = {
        slow3G: {
            downloadThroughput: (380 * 1024) / 8,
            uploadThroughput: (100 * 1024) / 8,
            latency: 200
        },
        fast3G: {
            downloadThroughput: (1.6 * 1024 * 1024) / 8,
            uploadThroughput: (750 * 1024) / 8,
            latency: 100
        },
        offline: {
            offline: true
        }
    }

    await page.emulateNetworkConditions(conditions[condition])
}
