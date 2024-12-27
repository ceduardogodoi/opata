import { EnvironmentVariables } from "@/app/domain/environment-variables/entity/environment-variables";
import type { NextConfig } from "next";

const environmentVariables = EnvironmentVariables.getInstance();
const [error] = environmentVariables.validateEnv();
console.log("error::", error);
if (error != null) {
  // Interrupts Next.js app bootstrapping
  throw error;
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
