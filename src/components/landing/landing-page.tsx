import { Description } from "@/components/landing/description";
import { FeaturedBanner } from "@/components/landing/featured-banner";
import { Header } from "@/components/landing/header";
import { Projects } from "@/components/landing/projects/projects";
import { Signature } from "@/components/landing/signature";
import { Tech } from "@/components/landing/tech/tech";
import { SitePage } from "@/components/layout/shell";

export const LandingPage = () => {
  return (
    <SitePage>
      <FeaturedBanner />
      <Header />
      <Description />
      <Tech />
      <Projects />
      <Signature />
    </SitePage>
  );
};
