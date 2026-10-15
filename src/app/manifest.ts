import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name.full} — ${site.title}`,
    short_name: site.name.first,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#242428",
    theme_color: "#242428",
    lang: "en-US",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: site.assets.icon,
        sizes: `${site.assets.figureSize}x${site.assets.figureSize}`,
        type: "image/jpeg",
      },
    ],
  };
}
