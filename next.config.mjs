/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Temporarily disable static export for development
  // output: 'export',
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true // Required for static export
  },
  trailingSlash: true,
  distDir: 'out',
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: 'false'
  }
};

export default nextConfig;
