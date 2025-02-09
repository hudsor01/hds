/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    typedRoutes: true,
  },
  images: {
    domains: ['www.propertywait.com'],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
