import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/schulbeginn-countdown",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
