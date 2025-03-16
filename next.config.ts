/** @type {import('next').NextConfig} */
import { Configuration } from "webpack";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ✅ Only rewrite API requests
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
  webpack: (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "canvas": false, // Prevents Webpack from bundling 'canvas'
    };
    return config;
  },
};

export default nextConfig;
