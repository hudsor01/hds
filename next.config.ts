import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    typedRoutes: true
  },
  optimizeFonts: true,
  images: {
    domains: ['www.hudsondigitalsolutions.com'],
    formats: ['image/avif', 'image/webp']
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks', 'types', 'utils'], // Directories to lint
    ignoreDuringBuilds: false // Ensure ESLint runs during builds
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL
  }
}

export default nextConfig
