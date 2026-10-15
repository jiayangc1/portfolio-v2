"use client";

import { Command } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { CommandMenu } from "@/components/layout/command-menu";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const SiteNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      aria-label="Main"
      className="flex h-full min-w-0 items-center justify-between gap-4 font-mono text-sm"
    >
      <Link
        href="/"
        className="shrink-0 text-foreground/80 lowercase transition-colors hover:text-foreground"
      >
        {site.name.full}
      </Link>
      <div className="flex min-w-0 items-center gap-1">
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto px-1">
          {site.nav.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-foreground/50",
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-md border border-foreground/10 px-1.5 py-0.5 text-foreground/50 text-xs transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          <Command className="size-3" />
          <span>K</span>
          <span className="sr-only">Open command menu</span>
        </button>
      </div>
      <CommandMenu open={open} onOpenChange={setOpen} />
    </nav>
  );
};
