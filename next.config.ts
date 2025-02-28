/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
