import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectItem } from "@/components/landing/projects/project-item";
import { ContentBox } from "@/components/layout/shell";
import { featuredProjects, projects } from "@/data/projects";

export const Projects = () => {
  return (
    <ContentBox
      className="flex flex-col gap-px bg-foreground/7 px-0 py-0"
      position="last"
      label="Projects"
    >
      <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectItem key={project.slug} {...project} />
        ))}
      </div>
      <Link
        href="/projects"
        className="group flex items-center justify-between bg-background px-5 py-3 font-mono text-foreground/50 text-xs transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_5%,var(--background))] hover:text-foreground sm:px-6"
      >
        all projects ({projects.length})
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </ContentBox>
  );
};
