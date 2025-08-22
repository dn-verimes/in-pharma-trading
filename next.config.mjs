/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true // Required for static export
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Disable middleware for static export
  skipMiddlewareUrlNormalize: true
};

export default nextConfig;
