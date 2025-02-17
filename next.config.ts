import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  reactStrictMode: true,
  transpilePackages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hudsondigitalsolutions.com',
        port: '',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    dirs: ['app', 'components', 'emails', 'middleware', 'prisma', 'supabase', 'lib', 'hooks', 'types', 'utils'],
    ignoreDuringBuilds: false
  },
  webpack: (config: Configuration) => {
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...(typeof config.resolve.fallback === 'object' && !Array.isArray(config.resolve.fallback) ? config.resolve.fallback : {}),
      process: false
    }
    return config
  }
}

export default nextConfig
