import Link from "next/link";
import { Signature } from "@/components/landing/signature";
import { PageHeader } from "@/components/layout/page-header";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { featuredProjects, otherProjects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Projects",
  description: `Web apps built by ${site.name.full}, including Authometry, 55GMS, Lofi Radio, and What Beats Paper.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <SitePage>
      <PageHeader
        title="Projects"
        description="Things I've built and shipped. Pick one for the details."
      />
      <ContentBox
        className="grid grid-cols-1 gap-px bg-foreground/7 px-0 py-0 sm:grid-cols-2"
        label="Featured"
      >
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.slug} {...project} />
        ))}
      </ContentBox>
      {otherProjects.length ? (
        <>
          <ContentBox className="px-6 py-4 sm:px-10" label="More">
            <h2 className="font-mono text-foreground/50 text-xs">
              more projects
            </h2>
          </ContentBox>
          <ContentBox
            className="grid grid-cols-1 gap-px bg-foreground/7 px-0 py-0 sm:grid-cols-2"
            position="last"
          >
            {otherProjects.map(({ slug, name, description, Icon, year }) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="group flex gap-3 bg-background px-5 py-5 transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_5%,var(--background))] sm:px-6 sm:py-6"
              >
                <Icon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-foreground opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-foreground text-sm tracking-tight">
                      {name}
                    </span>
                    {year ? (
                      <span className="font-mono text-foreground/40 text-xs">
                        {year}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-foreground/80 text-sm leading-relaxed">
                    {description}
                  </span>
                </div>
              </Link>
            ))}
          </ContentBox>
        </>
      ) : (
        <ContentBox position="last" className="h-0 p-0" />
      )}
      <Signature />
    </SitePage>
  );
}
