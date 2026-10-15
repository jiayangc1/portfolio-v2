"use client";

import { TechIcon } from "@/components/landing/tech/tech-icon";
import type { TechStackItem } from "@/components/landing/tech/tech-stack";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

type TechItemProps = TechStackItem & {
  onOpenChange: (open: boolean) => void;
};

export const TechItem = ({
  name,
  Icon,
  iconClassName,
  mobileOnly,
  onOpenChange,
}: TechItemProps) => {
  const card = (
    <HoverCard onOpenChange={onOpenChange} openDelay={10} closeDelay={100}>
      <HoverCardTrigger>
        <TechIcon className={cn(mobileOnly && "md:hidden")}>
          <Icon className={cn("h-6 w-6 text-foreground", iconClassName)} />
        </TechIcon>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="w-max px-3 py-2 text-xs"
      >
        {name}
      </HoverCardContent>
    </HoverCard>
  );

  if (mobileOnly) {
    return <div className="md:hidden">{card}</div>;
  }

  return card;
};
