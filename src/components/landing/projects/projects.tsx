"use client";

import { useWebHaptics } from "web-haptics/react";
import { ProjectItem } from "@/components/landing/projects/project-item";
import { projects } from "@/components/landing/projects/projects-data";
import { ContentBox } from "@/components/layout/shell";
import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";

export const Projects = () => {
  const { play } = usePlaySound({ sound: "interaction.subtle" });
  const { trigger } = useWebHaptics();

  const handleInteract = () => {
    trigger([{ duration: 15 }]);
    play();
  };

  return (
    <ContentBox
      className="grid grid-cols-1 gap-px bg-foreground/7 px-0 py-0 sm:grid-cols-2"
      position="last"
      label="Projects"
    >
      {projects.map((project) => (
        <ProjectItem
          key={project.name}
          {...project}
          onInteract={handleInteract}
        />
      ))}
    </ContentBox>
  );
};
