import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin ham fotoğraf upload (FormData) — Next 16 proxy kesmesin
    proxyClientMaxBodySize: "15mb",
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Fal.ai üretilen görsel önizlemeleri (admin paneli)
      { protocol: "https", hostname: "fal.media" },
      { protocol: "https", hostname: "v3.fal.media" },
      { protocol: "https", hostname: "v2.fal.media" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
