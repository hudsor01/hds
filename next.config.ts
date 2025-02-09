import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    domains: ['www.hudsondigitalsolutions.com'],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
