import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A package-lock.json in the parent
  // directory makes Turbopack infer the wrong root and resolve modules (e.g.
  // tw-animate-css) against the parent's node_modules. See the multi-lockfile
  // warning at startup.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // This project lives inside a OneDrive-synced folder. OneDrive moves/locks
    // files as they're written, which corrupts Turbopack's persistent on-disk
    // cache (".sst database failed" / "system cannot find the file"). Disable
    // the dev filesystem cache so Turbopack keeps its cache in memory.
    turbopackFileSystemCacheForDev: false,
  },
  // @ts-ignore
  allowedDevOrigins: ['100.108.16.62'],
};

export default nextConfig;
