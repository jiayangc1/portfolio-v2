import { ArrowUpRight } from "lucide-react";
import { Signature } from "@/components/landing/signature";
import { PageHeader } from "@/components/layout/page-header";
import { ContentBox, SitePage } from "@/components/layout/shell";
import { FetchCard } from "@/components/uses/fetch-card";
import { uses } from "@/data/uses";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Uses",
  description: `The hardware, software, and services ${site.name.full} uses to build things.`,
  path: "/uses",
});

export default function UsesPage() {
  return (
    <SitePage>
      <PageHeader
        title="Uses"
        description="The gear, tools, and services I build with."
      />
      <ContentBox
        className="flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-8"
        label="Machine"
      >
        <h2 className="font-medium font-mono text-foreground text-lg">
          Machine
        </h2>
        <FetchCard />
      </ContentBox>
      {uses.map(({ title, items }, index) => (
        <ContentBox
          key={title}
          className="flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-8"
          label={title}
          position={index === uses.length - 1 ? "last" : "middle"}
        >
          <h2 className="font-medium font-mono text-foreground text-lg">
            {title}
          </h2>
          <ul className="flex flex-col gap-3">
            {items.map(({ name, description, href }) => (
              <li key={name} className="flex flex-col gap-0.5">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 font-medium text-foreground hover:underline hover:underline-offset-4"
                  >
                    {name}
                    <ArrowUpRight className="size-3.5 text-foreground/40" />
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{name}</span>
                )}
                {description ? (
                  <span className="text-foreground/60 text-sm">
                    {description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </ContentBox>
      ))}
      <Signature />
    </SitePage>
  );
}
