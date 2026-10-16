"use client";

import { useEffect } from "react";
import { useWebHaptics } from "web-haptics/react";
import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";

// Every interactive element on the site plays the same sound on hover.
const INTERACTIVE = [
  "a[href]",
  "button:not(:disabled)",
  '[role="button"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[role="tab"]',
  "summary",
  '[data-slot="hover-card-trigger"]',
].join(",");

export const HoverSound = () => {
  const { play } = usePlaySound({ sound: "interaction.subtle" });
  const { trigger } = useWebHaptics();

  useEffect(() => {
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!(event.target instanceof Element)) return;

      const target = event.target.closest(INTERACTIVE);
      if (!target) return;

      // Moving between children of the same element isn't a new hover.
      const from =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest(INTERACTIVE)
          : null;
      if (from === target) return;

      trigger([{ duration: 15 }]);
      play();
    };

    document.addEventListener("pointerover", onPointerOver);
    return () => document.removeEventListener("pointerover", onPointerOver);
  }, [play, trigger]);

  return null;
};
