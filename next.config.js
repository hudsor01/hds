// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app"],
  },
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
    optimizePackageImports: [
      '@heroicons/react',
      '@mui/material',
      '@supabase/supabase-js',
      '@/components/ui'
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all external images (adjust for production)
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
        permanent: true,
      },
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
