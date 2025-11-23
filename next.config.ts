import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev`,
        protocol: 'https',
        port: '',

      }
    ]
  }
};

export default nextConfig;
