import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

export default defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    trace: 'on',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'NODE_NO_WARNINGS=1 yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      NODE_NO_WARNINGS: '1'
    },
  },
})