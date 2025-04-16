/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['debug', 'supports-color'],
  experimental: {
    serverComponentsExternalPackages: ['debug', 'supports-color']
  }
}

module.exports = nextConfig