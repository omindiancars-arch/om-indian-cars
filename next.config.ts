import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'yvknrwwtzjhsmqoeoupj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'stimg.cardekho.com',
      },
    ],
  },
};

export default nextConfig;
