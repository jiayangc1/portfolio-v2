import { withGTConfig } from "gt-next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.232"],

  output: "standalone",
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jiayangchen.com" }],
        destination: "https://jiayangchen.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withGTConfig(nextConfig);
