import { LandingPage } from "@/components/landing/landing-page";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `${site.name.full} · ${site.title}`,
  description: site.seo.description,
});

export default function Home() {
  return <LandingPage />;
}
