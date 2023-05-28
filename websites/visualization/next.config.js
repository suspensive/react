/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@suspensive/react', '@suspensive/react-query'],
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
