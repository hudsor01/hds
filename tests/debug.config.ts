import { defineConfig } from '@playwright/test'
import baseConfig from '../playwright.config'

export default defineConfig({
    ...baseConfig,
    workers: 1,
    retries: 0,
    timeout: 60000,
    use: {
        ...baseConfig.use,
        trace: 'on',
        video: 'on',
        screenshot: 'on',
        headless: false
    }
})
