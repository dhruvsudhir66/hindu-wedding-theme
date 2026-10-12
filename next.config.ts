import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static site: no Node server on Cloudflare Workers (avoids OpenNext manifest crashes).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
