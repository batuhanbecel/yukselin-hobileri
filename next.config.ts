import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
