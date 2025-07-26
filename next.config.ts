import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // <-- allow build to succeed even with type errors
  },
  // Enable static exports for Vercel
  output: 'standalone',
  // Handle native modules
  experimental: {
    esmExternals: 'loose',
  },
  // Webpack configuration for native modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
