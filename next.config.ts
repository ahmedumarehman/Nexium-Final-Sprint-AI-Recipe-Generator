import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", // or whatever value is appropriate
      allowedOrigins: ["*"], // allows any origin
    },
  },

};

export default nextConfig;
