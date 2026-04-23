import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3005',
  }
};

export default nextConfig;