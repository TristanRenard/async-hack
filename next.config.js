/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bp-prod.cloudimg.io',
        port: '',
        pathname: '/_images_/**',
      },
    ],
  },
}

module.exports = nextConfig
