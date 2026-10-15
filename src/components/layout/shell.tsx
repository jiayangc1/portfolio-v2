import { cn } from "@/lib/utils";

type SectionPosition = "first" | "middle" | "last" | "single";

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-w-0 min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="mx-auto grid min-h-screen w-full min-w-0 grid-cols-[24px_minmax(0,1fr)_24px] md:grid-cols-[1fr_48px_minmax(0,48rem)_48px_1fr]">
        <PatternRail className="col-start-1 md:col-start-2" />
        <div className="relative col-start-2 min-w-0 md:col-start-3">
          {children}
        </div>
        <PatternRail className="col-start-3 md:col-start-4" />
      </div>
    </main>
  );
};

export const PatternRail = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border-[--pattern-fg] border-x bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:color-mix(in_oklab,var(--color-foreground)_7%,transparent)]",
        className,
      )}
    />
  );
};

export const ContentBox = ({
  children,
  position = "middle",
  className,
  label,
  ...props
}: React.ComponentProps<"section"> & {
  position?: SectionPosition;
  label?: string;
}) => {
  return (
    <section
      {...props}
      className={cn(
        "group",
        "relative px-10 py-8",
        // Full-bleed hairlines without w-screen/100vw (100vw is wider than the
        // layout when a scrollbar is present and causes a right-edge gap). Large
        // fixed overshoot is clipped by the page overflow-x: clip.
        "before:pointer-events-none before:absolute before:top-0 before:right-[-9999px] before:left-[-9999px] before:h-px before:bg-foreground/7",
        "after:pointer-events-none after:absolute after:right-[-9999px] after:bottom-0 after:left-[-9999px] after:h-px after:bg-foreground/7",
        position === "single" && "before:top-0 after:bottom-0",
        position === "first" && "before:top-0 after:hidden",
        position === "middle" && "before:top-0 after:hidden",
        position === "last" && "before:top-0 after:bottom-0",
        className,
      )}
    >
      {label ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 right-full mr-[calc(48px+1rem)] hidden select-none whitespace-nowrap font-mono text-[11px] text-foreground/25 tracking-wide transition-colors group-hover:text-foreground/50 xl:block"
        >
          {label}
        </span>
      ) : null}
      {children}
    </section>
  );
};
