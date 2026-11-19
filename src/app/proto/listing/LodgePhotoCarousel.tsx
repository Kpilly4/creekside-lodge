"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Photo } from "@/app/proto/listing/data";

type LodgePhotoCarouselProps = {
  photos: readonly Photo[];
};

const control =
  "static size-12 translate-y-0 rounded-full border-foreground/60 bg-transparent text-foreground shadow-none transition-[color,background-color,border-color,transform] duration-150 ease-out enabled:hover:bg-foreground enabled:hover:text-card enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:opacity-100 [&_svg]:size-5 [&_svg]:stroke-[1.25]";

export function LodgePhotoCarousel({ photos }: LodgePhotoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const update = () => setIndex(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <Carousel
      aria-label="Photographs of the lodge"
      tabIndex={0}
      setApi={setApi}
      opts={{
        align: "start",
        breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
      }}
      className="mx-[clamp(1.5rem,7.7vw,7rem)] min-w-0 md:mx-0"
    >
      <CarouselContent className="ml-0 gap-4 [touch-action:pan-y_pinch-zoom]">
        {photos.map((photo, photoIndex) => (
          <CarouselItem
            key={photo.src}
            aria-label={`${photoIndex + 1} of ${photos.length}`}
            className="basis-[88%] pl-0 md:basis-auto md:last:pr-[7.7vw]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 45vw, 75vw"
              priority={photoIndex === 0}
              className="h-[clamp(17rem,34vw,30rem)] w-full object-cover md:w-auto md:max-w-none"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex items-center gap-6 md:mt-10 md:pr-[7.7vw]">
        <div aria-hidden="true" className="relative h-0.5 flex-1 bg-accent">
          <span
            className="absolute inset-y-0 left-0 bg-primary/60"
            style={{ width: `${((index + 1) / photos.length) * 100}%` }}
          />
        </div>
        <p className="text-[13px] tabular-nums uppercase tracking-[0.04em]" aria-live="polite" aria-atomic="true">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-4">
          <CarouselPrevious aria-label="Previous photograph" className={control} />
          <CarouselNext aria-label="Next photograph" className={control} />
        </div>
      </div>
    </Carousel>
  );
}
