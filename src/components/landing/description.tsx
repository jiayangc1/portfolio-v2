import { T } from "gt-next";
import { ContentBox } from "@/components/layout/shell";
import { site } from "@/lib/site";

export const Description = () => {
  return (
    <ContentBox
      className="flex flex-col gap-3 px-6 py-6 sm:px-10 sm:py-8"
      position="middle"
      label="Bio"
    >
      <p className="text-foreground/80">
        I&apos;m {site.name.full}, a{" "}
        <span className="text-foreground">{site.title}</span> based in{" "}
        <span className="inline-flex items-baseline gap-1 text-foreground">
          {/** biome-ignore lint/performance/noImgElement: img */}
          <img
            src={site.location.flagUrl}
            alt={`${site.location.country} flag`}
            width={16}
            height={16}
            className="inline-block h-4 w-4 shrink-0 translate-y-0.5"
          />
          {site.location.label}
        </span>
        .
      </p>
      <p className="text-foreground/80">
        <T>
          I&apos;ve worked across frontends and backends, with a few IT
          infrastructure projects as well. I build web apps like Authometry, an
          inspectable OAuth platform; 55GMS, a browser games and web proxy
          platform; and Lofi Radio, a synced 24/7 stream.
        </T>
      </p>
    </ContentBox>
  );
};
