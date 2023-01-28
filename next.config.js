/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'www.elcedrobarcelona.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
