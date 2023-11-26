/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/input-products/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
