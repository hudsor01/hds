import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  images: {
    domains: ['www.hudsondigitalsolutions.com'],
    formats: ['image/avif', 'image/webp']
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks', 'types', 'utils'],
    ignoreDuringBuilds: false
  }
}

export default nextConfig
