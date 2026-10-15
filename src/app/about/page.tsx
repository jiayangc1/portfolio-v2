import { AboutPage } from "@/components/about/about-page";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 86400;

export const metadata = createMetadata({
  title: "About",
  description: `About ${site.name.full}: background, current work, GitHub activity, and a timeline of projects.`,
  path: "/about",
});

export default function About() {
  return <AboutPage />;
}
