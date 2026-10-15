"use client";

import { ArrowLeft, ArrowUpRight, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { LetsConnect } from "@/components/contact/lets-connect";
import { LetsConnectForm } from "@/components/contact/lets-connect-form";
import {
  connectCopy,
  useLetsConnectForm,
} from "@/components/contact/use-lets-connect-form";
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

type ConnectView = "links" | "form";

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
  const [view, setView] = React.useState<ConnectView>("links");
  const { form, onSubmit, status, errorMessage, reset } = useLetsConnectForm({
    onSuccess: () => setOpen(false),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setView("links");
      reset();
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-11 w-full">
          <Sparkles data-icon="inline-start" />
          Connect
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {view === "links" ? (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Connect</DrawerTitle>
              <DrawerDescription>
                {connectCopy.menuDescription}
              </DrawerDescription>
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
              <Button className="mt-2 w-full" onClick={() => setView("form")}>
                <Send data-icon="inline-start" />
                Send a message
              </Button>
            </nav>
          </>
        ) : (
          <>
            <DrawerHeader className="text-left">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 mb-1 w-fit"
                onClick={() => setView("links")}
              >
                <ArrowLeft data-icon="inline-start" />
                Back
              </Button>
              <DrawerTitle>{connectCopy.title}</DrawerTitle>
              <DrawerDescription>{connectCopy.description}</DrawerDescription>
            </DrawerHeader>
            <LetsConnectForm
              form={form}
              onSubmit={onSubmit}
              status={status}
              errorMessage={errorMessage}
              className="px-4 pb-8"
            />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export const HeaderActions = () => {
  return (
    <>
      <div className="hidden shrink-0 flex-row items-center gap-1 md:flex">
        <SocialIconButtons />
        <LetsConnect />
      </div>
      <div className="pt-4 md:hidden">
        <MobileConnectMenu />
      </div>
    </>
  );
};
