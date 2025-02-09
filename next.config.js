/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
    optimizePackageImports: ["@mui/material"],
  },
  images: {
    domains: ["www.propertywait.com"],
  },
}

module.exports = nextConfig
