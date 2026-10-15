import type { Metadata } from "next";
import { site } from "@/lib/site";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

const titleTemplate = `%s · ${site.name.full}`;

export function getCanonicalUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function createMetadata({
  title,
  description = site.seo.description,
  path = "/",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonical = getCanonicalUrl(path);
  const pageTitle = title ?? site.name.full;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name.full} · ${site.title}`,
      template: titleTemplate,
    },
    description,
    keywords: [...site.seo.keywords],
    authors: [{ name: site.name.full, url: site.url }],
    creator: site.name.full,
    publisher: site.name.full,
    applicationName: site.name.full,
    category: "technology",
    icons: {
      icon: site.assets.icon,
      apple: site.assets.icon,
    },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "en-US": canonical,
      },
    },
    openGraph: {
      type: "profile",
      locale: site.seo.locale,
      url: canonical,
      siteName: site.name.full,
      title: pageTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name.full} — ${site.title}`,
        },
      ],
      firstName: site.name.first,
      lastName: site.name.last,
      username: site.seo.twitterHandle.replace("@", ""),
    },
    twitter: {
      card: "summary_large_image",
      site: site.seo.twitterHandle,
      creator: site.seo.twitterHandle,
      title: pageTitle,
      description,
      images: ["/opengraph-image"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    verification: {
      google: site.seo.googleVerification,
      other: site.seo.bingVerification
        ? { "msvalidate.01": site.seo.bingVerification }
        : undefined,
    },
    other: {
      "ai-content-declaration": "human-authored",
    },
  };
}

export function createJsonLd() {
  const profileUrl = getCanonicalUrl("/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${profileUrl}#website`,
      url: profileUrl,
      name: site.name.full,
      alternateName: [...site.name.alternate, "jiayangchen.com"],
      description: site.seo.description,
      inLanguage: "en-US",
      publisher: { "@id": `${profileUrl}#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${profileUrl}#profilepage`,
      url: profileUrl,
      name: `${site.name.full} — ${site.title}`,
      description: site.seo.description,
      inLanguage: "en-US",
      isPartOf: { "@id": `${profileUrl}#website` },
      mainEntity: { "@id": `${profileUrl}#person` },
      primaryImageOfPage: { "@id": `${profileUrl}#avatar` },
      dateModified: new Date().toISOString(),
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      name: site.name.full,
      alternateName: [...site.name.alternate],
      givenName: site.name.first,
      familyName: site.name.last,
      url: profileUrl,
      mainEntityOfPage: { "@id": `${profileUrl}#profilepage` },
      image: {
        "@type": "ImageObject",
        "@id": `${profileUrl}#avatar`,
        url: getCanonicalUrl(site.assets.figure),
        contentUrl: getCanonicalUrl(site.assets.figure),
        width: site.assets.figureSize,
        height: site.assets.figureSize,
        caption: `${site.name.full}, ${site.title}`,
      },
      jobTitle: site.title,
      description: site.seo.tagline,
      homeLocation: {
        "@type": "Place",
        name: site.location.label,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: site.location.countryCode,
        },
      },
      knowsAbout: [
        "Full stack development",
        "Authometry",
        "OAuth 2.0",
        "OpenID Connect",
        "React",
        "Node.js",
        "Express",
        "TypeScript",
        "JavaScript",
        "Python",
        "Swift",
        "PostgreSQL",
        "Databases",
        "Cloud infrastructure",
        "Cloudflare",
      ],
      sameAs: site.social.map((link) => link.href),
    },
  ];
}
