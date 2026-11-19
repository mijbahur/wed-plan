import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
        remotePatterns: [
            { protocol: "https", hostname: "i.ibb.co" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
        ],
    },
  async rewrites() {
    return process.env.API_URL
      ? [
          {
            source: "/api/uploads/:path*",
            destination: `${process.env.API_URL}/api/uploads/:path*`,
          },
        ]
      : [];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
