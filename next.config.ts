import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.platform === "win32"
    ? {
        experimental: {
          cpus: 1,
          workerThreads: false,
          webpackBuildWorker: false,
          parallelServerCompiles: false,
          parallelServerBuildTraces: false,
        },
      }
    : {}),
};

export default nextConfig;
