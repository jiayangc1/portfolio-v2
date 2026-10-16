"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/sensory-ui/carousel";
import type { ProjectScreenshot } from "@/data/projects";

const Shot = ({ src, alt, caption }: ProjectScreenshot) => (
  <figure className="flex flex-col gap-2">
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-video overflow-hidden rounded-md border border-foreground/10 bg-foreground/5"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 44rem"
        className="object-contain"
      />
    </a>
    {caption ? (
      <figcaption className="font-mono text-foreground/50 text-xs">
        {caption}
      </figcaption>
    ) : null}
  </figure>
);

export const ScreenshotGallery = ({
  screenshots,
}: {
  screenshots: ProjectScreenshot[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (screenshots.length === 1) return <Shot {...screenshots[0]} />;

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {screenshots.map((shot) => (
          <CarouselItem key={shot.src}>
            <Shot {...shot} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-foreground/40 text-xs">
          {current + 1} / {screenshots.length}
        </span>
        <div className="flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
    </Carousel>
  );
};
