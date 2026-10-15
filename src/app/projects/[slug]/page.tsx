import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { Prose } from "@/components/content/prose";
import { Signature } from "@/components/landing/signature";
import { PageHeader } from "@/components/layout/page-header";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${slug}`,
  });
}

const sectionClassName = "flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-8";

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { name, description, href, Icon, year, overview, stack, source } =
    project;

  return (
    <SitePage>
      <PageHeader title={name} description={description} label="Project">
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-1 font-mono text-foreground/50 text-xs transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          all projects
        </Link>
        <div className="flex items-center gap-2 text-foreground/50">
          <Icon aria-hidden className="size-4" />
          {year ? <span className="font-mono text-xs">{year}</span> : null}
        </div>
      </PageHeader>

      <ContentBox
        className="flex flex-wrap gap-2 px-6 py-4 sm:px-10"
        label="Links"
      >
        <Button asChild size="sm">
          <Link href={href} target="_blank" rel="noopener noreferrer">
            Visit {name}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
        {source ? (
          <Button asChild size="sm" variant="outline">
            <Link href={source} target="_blank" rel="noopener noreferrer">
              <FaGithub data-icon="inline-start" />
              Source
            </Link>
          </Button>
        ) : null}
      </ContentBox>

      {overview?.length ? (
        <ContentBox className={sectionClassName} label="Overview">
          <Prose>
            {overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </ContentBox>
      ) : null}

      {stack?.length ? (
        <ContentBox className={sectionClassName} label="Stack">
          <ul className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-foreground/10 bg-foreground/5 px-2 py-0.5 font-mono text-foreground/80 text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        </ContentBox>
      ) : null}

      <ContentBox position="last" className="h-0 p-0" />
      <Signature />
    </SitePage>
  );
}
