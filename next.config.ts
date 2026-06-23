import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: "",
  async redirects() {
    return [
      {
        source: "/ahinsree",
        destination: "/ahinsree-b",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
