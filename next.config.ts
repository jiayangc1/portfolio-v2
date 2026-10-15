import { withGTConfig } from "gt-next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.232"],

  reactCompiler: true,
};

export default withGTConfig(nextConfig);
