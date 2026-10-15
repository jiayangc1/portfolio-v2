import { Rss } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Signature } from "@/components/landing/signature";
import { PageHeader } from "@/components/layout/page-header";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { formatPostDate, posts } from "@/data/posts";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const baseMetadata = createMetadata({
  title: "Blog",
  description: `Writing by ${site.name.full} on building web apps, infrastructure, and side projects.`,
  path: "/blog",
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  return (
    <SitePage>
      <PageHeader
        title="Blog"
        description="Notes on building things for the web."
      >
        <Link
          href="/blog/rss.xml"
          className="inline-flex w-fit items-center gap-1 font-mono text-foreground/50 text-xs transition-colors hover:text-foreground"
        >
          <Rss className="size-3" />
          rss
        </Link>
      </PageHeader>
      <ContentBox
        className="flex flex-col gap-px bg-foreground/7 px-0 py-0"
        position="last"
        label="Posts"
      >
        {posts.length === 0 ? (
          <p className="bg-background px-6 py-6 text-foreground/60 sm:px-10">
            Nothing here yet.
          </p>
        ) : (
          posts.map(({ slug, title, description, date }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="flex flex-col gap-1 bg-background px-6 py-5 transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_5%,var(--background))] sm:px-10"
            >
              <time
                dateTime={date}
                className="font-mono text-foreground/40 text-xs"
              >
                {formatPostDate(date)}
              </time>
              <span className="font-medium text-foreground">{title}</span>
              <span className="text-foreground/70 text-sm">{description}</span>
            </Link>
          ))
        )}
      </ContentBox>
      <Signature />
    </SitePage>
  );
}
