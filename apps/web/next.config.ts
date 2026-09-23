import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export to support Next.js API routes on Vercel

  // Quantum Computers and Data Centers were merged into Photonic Chips;
  // keep old links and search results working.
  async redirects() {
    return [
      { source: "/quantum", destination: "/photonics", permanent: true },
      { source: "/data-centers", destination: "/photonics", permanent: true },
    ];
  },
};

export default nextConfig;
