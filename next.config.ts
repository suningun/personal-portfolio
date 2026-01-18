import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
