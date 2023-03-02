/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org', 
      'www.elcedrobarcelona.com', 
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'firebasestorage.googleapis.com',
    ]
  }
}

module.exports = nextConfig
