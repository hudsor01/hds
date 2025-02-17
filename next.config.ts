import type { NextConfig } from 'next'

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
    dirs: ['app', 'components', 'lib', 'hooks', 'types', 'utils'],
    ignoreDuringBuilds: false
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: false,
    }
    return config
  }
}

export default nextConfig
