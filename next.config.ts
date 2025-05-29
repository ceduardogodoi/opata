import { EnvironmentVariables } from "@/app/domain/environment-variables/entity/environment-variables";
import type { NextConfig } from "next";

const environmentVariables = EnvironmentVariables.getInstance();
const [error] = environmentVariables.validateEnv();
if (error != null) {
  // Interrupts Next.js app bootstrapping
  throw error;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
