import { Description } from "@/components/landing/description";
import { FeaturedBanner } from "@/components/landing/featured-banner";
import { Header } from "@/components/landing/header";
import { Projects } from "@/components/landing/projects/projects";
import { Signature } from "@/components/landing/signature";
import { Tech } from "@/components/landing/tech/tech";
import { ContentBox, PageShell } from "@/components/layout/shell";

export const LandingPage = () => {
  return (
    <PageShell>
      <ContentBox position="first" className="h-12 sm:h-16 md:h-24" />
      <FeaturedBanner />
      <Header />
      <Description />
      <Tech />
      <Projects />
      <Signature />
    </PageShell>
  );
};
