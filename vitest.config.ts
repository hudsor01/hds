// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.tsx',
        'src/**/*.types.ts',
        'src/pages/**/*', // Exclude Next.js pages from coverage
      ],
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Add custom resolvers if needed for Supabase/Prisma
    server: {
      deps: {
        inline: ['@supabase/supabase-js', '@prisma/client'],
      },
    },
    globals: true,
  },
})