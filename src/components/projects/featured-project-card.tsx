import Image from "next/image";
import Link from "next/link";
import { StackList } from "@/components/projects/stack-list";
import type { Project } from "@/data/projects";

export const FeaturedProjectCard = ({
  slug,
  name,
  description,
  Icon,
  year,
  overview,
  stack,
  screenshots,
}: Project) => {
  const cover = screenshots?.[0];

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col gap-4 bg-background px-5 py-5 transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_5%,var(--background))] sm:px-6 sm:py-6"
    >
      {cover ? (
        <div className="relative aspect-video overflow-hidden rounded-md border border-foreground/10 bg-foreground/5">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, 24rem"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <div className="flex gap-3">
        <Icon
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-foreground opacity-80 transition-opacity group-hover:opacity-100"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
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
          {overview?.[0] ? (
            <span className="line-clamp-3 text-foreground/60 text-sm leading-relaxed">
              {overview[0]}
            </span>
          ) : null}
          {stack?.length ? (
            <StackList stack={stack.slice(0, 5)} className="mt-1" />
          ) : null}
        </div>
      </div>
    </Link>
  );
};
