"use client";

import type * as React from "react";
import { Code2, Music2 } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { StatusSkeleton } from "@/components/landing/status/status-skeleton";
import { site } from "@/lib/site";
import type { DiscordPresenceStatus, StatusPayload } from "@/lib/status/types";
import { useLocalTime } from "@/hooks/use-local-time";
import { useStatus } from "@/hooks/use-status";
import { cn } from "@/lib/utils";

const discordStatusLabel: Record<DiscordPresenceStatus, string> = {
  online: "Available",
  idle: "Away",
  dnd: "Busy",
  offline: "Unavailable",
};

const discordStatusColor: Record<DiscordPresenceStatus, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-400",
  dnd: "bg-red-500",
  offline: "bg-muted-foreground/35",
};

function StatusSeparator() {
  return (
    <span aria-hidden className="hidden text-foreground/15 md:inline">
      /
    </span>
  );
}

function StatusRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 max-w-full items-center gap-1.5 text-sm text-muted-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

type StatusProps = {
  initialStatus?: StatusPayload;
  className?: string;
};

export const Status = ({ initialStatus, className }: StatusProps) => {
  const { status, isLoading } = useStatus(initialStatus);
  const timezone = status?.timezone ?? site.status.timezone;
  const timezoneLabel = status?.timezoneLabel ?? site.status.timezoneLabel;
  const time = useLocalTime({ timezone });

  if (isLoading && !status) {
    return <StatusSkeleton className={className} />;
  }

  const items: { key: string; node: React.ReactNode }[] = [];

  if (status?.discord) {
    items.push({
      key: "discord",
      node: (
        <StatusRow>
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              discordStatusColor[status.discord.status],
            )}
          />
          <span className="text-foreground/80">
            {discordStatusLabel[status.discord.status]}
          </span>
        </StatusRow>
      ),
    });
  }

  if (time) {
    items.push({
      key: "time",
      node: (
        <StatusRow>
          <span className="font-mono text-foreground/80 tabular-nums">{time}</span>
          <span>in {timezoneLabel}</span>
        </StatusRow>
      ),
    });
  }

  if (status?.coding?.todayTotal) {
    items.push({
      key: "coding",
      node: (
        <StatusRow className="items-start sm:items-center">
          <Code2 className="mt-0.5 size-3.5 shrink-0 sm:mt-0" />
          <span>
            <span className="text-foreground/80">{status.coding.todayTotal}</span>{" "}
            coded today
          </span>
        </StatusRow>
      ),
    });
  }

  if (status?.music) {
    items.push({
      key: "music",
      node: (
        <StatusRow className="items-start sm:items-center">
          <Music2 className="mt-0.5 size-3.5 shrink-0 sm:mt-0" />
          <span className="min-w-0 leading-snug">
            {status.music.isNowPlaying ? "Listening to " : "Recently played "}
            {status.music.url ? (
              <Link
                href={status.music.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 transition-opacity hover:opacity-80"
              >
                {status.music.artist} — {status.music.track}
              </Link>
            ) : (
              <span className="text-foreground/80">
                {status.music.artist} — {status.music.track}
              </span>
            )}
          </span>
        </StatusRow>
      ),
    });
  } else if (status?.discord?.activity) {
    items.push({
      key: "activity",
      node: (
        <StatusRow>
          <span className="min-w-0 leading-snug">
            {status.discord.activity.label} {status.discord.activity.detail}
          </span>
        </StatusRow>
      ),
    });
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex animate-in flex-col gap-2 duration-500 fade-in md:flex-row md:flex-wrap md:items-center md:gap-x-2 md:gap-y-1",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {index > 0 ? <StatusSeparator /> : null}
          {item.node}
        </Fragment>
      ))}
    </div>
  );
};
