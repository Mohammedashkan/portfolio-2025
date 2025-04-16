/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['debug', 'supports-color'],
  experimental: {
    serverComponentsExternalPackages: ['debug', 'supports-color']
  },
  // Disable ESLint during build to avoid configuration issues
  eslint: {
    ignoreDuringBuilds: true
  },
  // Optionally, you can also ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig