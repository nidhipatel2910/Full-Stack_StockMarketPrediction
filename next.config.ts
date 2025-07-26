import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // <-- allow build to succeed even with type errors
  },
  // Enable static exports for Vercel
  output: 'standalone',
};

export default nextConfig;
