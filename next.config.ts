import { NextConfig } from 'next/types';

const config: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['app', 'components', 'lib', 'hooks', 'types'],
  },
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost'],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
        permanent: true,
      },
    ];
  },
};

export default config;
