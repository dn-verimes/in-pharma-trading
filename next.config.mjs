/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true // Only needed for static export
  },
  output: 'export', // Enable static export for Azure SWA
  trailingSlash: true,
  distDir: 'out', // Only needed for static export
  skipMiddlewareUrlNormalize: true // Only needed for static export
};

export default nextConfig;
