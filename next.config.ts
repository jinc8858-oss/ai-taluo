import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ai-taluo',
  images: { unoptimized: true },
};

export default nextConfig;
