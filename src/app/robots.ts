import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/emoji/",
          "/api/discord/",
          "/api/tip",
          "/api/features",
          "/api/cache/",
          "/api/status",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: [
          "/api/emoji/",
          "/api/discord/",
          "/api/tip",
          "/api/features",
          "/api/cache/",
          "/api/status",
        ],
      },
    ],
    sitemap: getCanonicalUrl("/sitemap.xml"),
    host: getCanonicalUrl("/"),
  };
}