import { posts } from "@/data/posts";
import { getCanonicalUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export function GET() {
  const blogUrl = getCanonicalUrl("/blog");
  const items = posts
    .map((post) => {
      const url = getCanonicalUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name.full} · Blog`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(`Writing by ${site.name.full}.`)}</description>
    <language>en-us</language>
    <atom:link href="${getCanonicalUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
