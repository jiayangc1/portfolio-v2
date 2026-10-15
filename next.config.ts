import createMDX from "@next/mdx";
import { withGTConfig } from "gt-next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.232"],

  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,

  experimental: {
    inlineCss: true,
  },

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

const withMDX = createMDX();

export default withGTConfig(withMDX(nextConfig));
