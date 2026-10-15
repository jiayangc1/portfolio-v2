"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { site } from "@/lib/site";

const socialIcons = {
  X: FaXTwitter,
  GitHub: FaGithub,
  Discord: FaDiscord,
  LinkedIn: FaLinkedin,
} as const;

const SocialIconButtons = () => (
  <>
    {site.social.map(({ label, href }) => {
      const Icon = socialIcons[label];
      return (
        <Button key={href} asChild variant="ghost" size="icon">
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <Icon />
            <span className="sr-only">{label}</span>
          </Link>
        </Button>
      );
    })}
  </>
);

const MobileConnectMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-11 w-full">
          <Sparkles data-icon="inline-start" />
          Connect
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Connect</DrawerTitle>
          <DrawerDescription>Find me around the web.</DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-4 pb-6">
          {site.social.map(({ label, href }) => {
            const Icon = socialIcons[label];
            return (
              <Button
                key={href}
                asChild
                variant="ghost"
                className="h-auto w-full justify-start gap-3 px-3 py-3"
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="font-medium">{label}</span>
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
                </Link>
              </Button>
            );
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export const HeaderActions = () => {
  return (
    <>
      <div className="hidden shrink-0 flex-row items-center gap-1 md:flex">
        <SocialIconButtons />
      </div>
      <div className="pt-4 md:hidden">
        <MobileConnectMenu />
      </div>
    </>
  );
};
