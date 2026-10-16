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
};

const withMDX = createMDX();

export default withGTConfig(withMDX(nextConfig));
