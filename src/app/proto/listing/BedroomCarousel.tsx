"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import type { Room } from "@/app/proto/listing/data";

type BedroomCarouselProps = {
  rooms: readonly Room[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const control = "static size-12 translate-y-0 rounded-full border-foreground/60 bg-transparent text-foreground shadow-none transition-colors hover:bg-foreground hover:text-card [&_svg]:size-5 [&_svg]:stroke-[1.25]";

export function BedroomCarousel({ rooms, selectedIndex, onSelect }: BedroomCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const update = () => onSelect(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api, onSelect]);

  useEffect(() => {
    if (api && api.selectedScrollSnap() !== selectedIndex) api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  return (
    <Carousel
      setApi={setApi}
      aria-label="Bedroom photographs"
      tabIndex={0}
      opts={{ align: "end", loop: true, breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }}
      className="-ml-[var(--bedroom-inset)] min-w-0 [--bedroom-inset:clamp(1.5rem,7.7vw,7rem)]"
    >
      <CarouselContent className="ml-0 [touch-action:pan-y_pinch-zoom]">
        {rooms.map((room, index) => (
          <CarouselItem key={room.name} aria-label={`${room.name}, ${index + 1} of ${rooms.length}`} className="mr-4 basis-[calc(100%-var(--bedroom-inset))] pl-0">
            {room.photo && (
              <Image src={room.photo.src} alt={room.photo.alt} width={room.photo.width} height={room.photo.height} sizes="(min-width: 768px) 50vw, 85vw" draggable={false} className="aspect-[3/2] w-full object-cover" />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="pl-[var(--bedroom-inset)]">
        <p aria-live="polite" aria-atomic="true" className="display mt-5 text-[22px] font-normal text-primary">{rooms[selectedIndex].note}</p>
        <div className="mt-8 flex items-center gap-6 md:mt-10">
          <div aria-hidden="true" className="relative h-0.5 flex-1 bg-accent">
            <span className="absolute inset-y-0 left-0 bg-primary/60" style={{ width: `${((selectedIndex + 1) / rooms.length) * 100}%` }} />
          </div>
          <p aria-live="polite" aria-atomic="true" className="text-[13px] tabular-nums uppercase tracking-[0.04em]">{String(selectedIndex + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}</p>
          <div className="flex gap-4">
            <CarouselPrevious aria-label="Previous bedroom" className={control} />
            <CarouselNext aria-label="Next bedroom" className={control} />
          </div>
        </div>
      </div>
    </Carousel>
  );
}
