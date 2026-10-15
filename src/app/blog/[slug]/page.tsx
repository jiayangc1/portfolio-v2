import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/content/prose";
import { Signature } from "@/components/landing/signature";
import { PageHeader } from "@/components/layout/page-header";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { formatPostDate, getPost, posts } from "@/data/posts";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const metadata = createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <SitePage>
      <PageHeader title={post.title} label="Post">
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-1 font-mono text-foreground/50 text-xs transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          all posts
        </Link>
        <time
          dateTime={post.date}
          className="font-mono text-foreground/40 text-xs"
        >
          {formatPostDate(post.date)}
        </time>
      </PageHeader>
      <ContentBox
        className="px-6 py-6 sm:px-10 sm:py-8"
        position="last"
        label="Post"
      >
        <article>
          <Prose>
            <Content />
          </Prose>
        </article>
      </ContentBox>
      <Signature />
    </SitePage>
  );
}
