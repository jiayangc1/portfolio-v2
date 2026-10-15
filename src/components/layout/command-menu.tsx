"use client";

import { ArrowUpRight, FileText, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { site } from "@/lib/site";

const pages = [{ label: "home", href: "/" }, ...site.nav];

export const CommandMenu = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Navigate"
      description="Jump to a page or find me around the web."
    >
      <CommandInput placeholder="Where to?" />
      <CommandList>
        <CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map(({ label, href }) => (
            <CommandItem
              key={href}
              value={label}
              onSelect={() => run(() => router.push(href))}
            >
              {href === "/" ? <Home /> : <FileText />}
              <span className="capitalize">{label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Connect">
          {site.social.map(({ label, href }) => (
            <CommandItem
              key={href}
              value={label}
              onSelect={() =>
                run(() => window.open(href, "_blank", "noopener,noreferrer"))
              }
            >
              <ArrowUpRight />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
