import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/tech-portfolio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
