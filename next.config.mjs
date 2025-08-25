/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true // Required for static export
  },
  trailingSlash: true,
  distDir: 'out'
};

export default nextConfig;
