/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-production-strapi-api.com',
        pathname: '/**',
      },
    ],
  },
  // Disable SSG fetch errors during build time
  experimental: {
    missingSuspenseWithCSREnabled: true,
  },
}

export default nextConfig
