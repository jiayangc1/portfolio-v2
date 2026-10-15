"use client";

import { useWebHaptics } from "web-haptics/react";
import { TechItem } from "@/components/landing/tech/tech-item";
import { techStack } from "@/components/landing/tech/tech-stack";
import { ContentBox } from "@/components/layout/shell";
import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";

export const Tech = () => {
  const { play } = usePlaySound({ sound: "interaction.subtle" });
  const { trigger } = useWebHaptics();

  const handleOpenChange = () => {
    trigger([{ duration: 15 }]);
    play();
  };

  return (
    <ContentBox
      className="grid grid-cols-4 gap-px bg-foreground/7 px-0 py-0 sm:grid-cols-6 md:grid-cols-9"
      position="middle"
      label="Tech"
    >
      {techStack.map((item) => (
        <TechItem key={item.name} {...item} onOpenChange={handleOpenChange} />
      ))}
    </ContentBox>
  );
};
