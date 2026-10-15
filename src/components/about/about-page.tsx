import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import {
  GithubActivity,
  GithubActivitySkeleton,
} from "@/components/about/github-activity";
import { Prose } from "@/components/content/prose";
import { Signature } from "@/components/landing/signature";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { about } from "@/data/about";

const sectionClassName = "flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-8";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-medium font-mono text-foreground text-lg">{children}</h2>
);

export const AboutPage = () => {
  return (
    <SitePage>
      <ContentBox className={sectionClassName} label="About">
        <h1 className="font-extrabold font-mono text-3xl tracking-tight sm:text-4xl">
          About
        </h1>
        <Prose>
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </ContentBox>

      <ContentBox className={sectionClassName} label="Now">
        <SectionHeading>Now</SectionHeading>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          {about.now.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="font-mono text-foreground/50 text-sm">{label}</dt>
              <dd className="text-foreground/80">{value}</dd>
            </div>
          ))}
        </dl>
      </ContentBox>

      <ContentBox className={sectionClassName} label="GitHub">
        <SectionHeading>GitHub</SectionHeading>
        <Suspense fallback={<GithubActivitySkeleton />}>
          <GithubActivity />
        </Suspense>
      </ContentBox>

      <ContentBox className={sectionClassName} label="Timeline" position="last">
        <SectionHeading>Timeline</SectionHeading>
        <ol className="relative flex flex-col gap-6 border-foreground/10 border-l pl-6">
          {about.timeline.map(({ date, title, description, href }) => (
            <li
              key={`${date}-${title}`}
              className="relative flex flex-col gap-1"
            >
              <span
                aria-hidden
                className="-left-[calc(1.5rem+4.5px)] absolute top-1.5 size-2 rounded-full border border-foreground/30 bg-background"
              />
              <span className="font-mono text-foreground/40 text-xs">
                {date}
              </span>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-foreground hover:underline hover:underline-offset-4"
                >
                  {title}
                  <ArrowUpRight className="size-3.5 text-foreground/40" />
                </a>
              ) : (
                <span className="font-medium text-foreground">{title}</span>
              )}
              {description ? (
                <p className="text-foreground/60 text-sm">{description}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </ContentBox>

      <Signature />
    </SitePage>
  );
};
