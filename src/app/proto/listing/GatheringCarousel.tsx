"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import type { Photo } from "@/app/proto/listing/data";

type GatheringCarouselProps = {
  places: readonly { title: string; text: string; photo: Photo | null }[];
};

const control = "static size-12 translate-y-0 rounded-full border-foreground/60 bg-transparent text-foreground shadow-none transition-[color,background-color,border-color,transform] duration-150 ease-out enabled:hover:bg-foreground enabled:hover:text-card enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:opacity-100 md:size-16 [&_svg]:size-5 [&_svg]:stroke-[1.75]";

export function GatheringCarousel({ places }: GatheringCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    // Embla owns scrolling and looping. Only the card's visual treatment changes
    // with its position: large in the middle, small/high left, small/low right.
    const update = () => {
      if (!desktop.matches) return;
      const viewport = api.rootNode().getBoundingClientRect();
      const slides = api.slideNodes();
      slides.forEach((slide) => {
        const card = slide.firstElementChild as HTMLElement | null;
        if (!card) return;
        const bounds = slide.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(slide).marginRight) || 0;
        const distance = (bounds.left - viewport.left - viewport.width * 0.38) / (bounds.width + gap);
        const amount = Math.min(1, Math.abs(distance));
        card.style.setProperty("--slide-scale", String(1 - amount * (1 - 36 / 52)));
        card.style.setProperty("--slide-y", `${amount * (distance < 0 ? 2.75 : 12)}vw`);
        card.style.setProperty("--slide-origin", distance < 0 ? "top right" : "top left");
      });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    api.on("scroll", schedule);
    api.on("settle", update);
    api.on("reInit", schedule);
    return () => {
      cancelAnimationFrame(frame);
      api.off("scroll", schedule);
      api.off("settle", update);
      api.off("reInit", schedule);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      aria-label="Places to gather"
      tabIndex={0}
      opts={{ align: "start", loop: true, breakpoints: {
        "(min-width: 768px)": { align: (viewSize) => viewSize * 0.38, startIndex: 1 },
        "(prefers-reduced-motion: reduce)": { duration: 0 },
      } }}
      className="ml-[clamp(1.5rem,7.7vw,7rem)] mt-12 min-w-0 md:ml-0 md:mt-16"
    >
      <CarouselContent className="ml-0 items-start [touch-action:pan-y_pinch-zoom]">
        {places.map((place, index) => (
          <CarouselItem key={place.title} aria-label={`${place.title}, ${index + 1} of ${places.length}`} className="mr-4 basis-auto pl-0 md:mr-[1.2vw]">
            <article
              className="relative isolate flex aspect-[4/5] w-[82vw] items-end overflow-hidden bg-footer text-footer-foreground md:aspect-square md:w-[52vw] md:will-change-transform md:[transform:translateY(var(--slide-y))_scale(var(--slide-scale))] md:[transform-origin:var(--slide-origin)]"
              style={{ "--slide-scale": index === 1 ? 1 : 36 / 52, "--slide-y": index === 1 ? "0vw" : index === 0 ? "2.75vw" : "12vw", "--slide-origin": index === 0 ? "top right" : "top left" } as CSSProperties}
            >
              {place.photo && (
                <Image src={place.photo.src} alt={place.photo.alt} fill sizes="(min-width: 768px) 52vw, 82vw" draggable={false} className="-z-20 object-cover" />
              )}
              {place.photo && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-footer/85 via-footer/40 to-footer/10" />}
              <div className="w-full px-6 py-8 md:px-[4.5vw] md:py-[4.5vw]">
                <h3 className="text-[clamp(2.5rem,3.2vw,4rem)] leading-[1.1]">{place.title}</h3>
                <p className="mt-6 max-w-[40ch] text-[clamp(1rem,1.4vw,1.375rem)] leading-[1.65] md:mt-8">{place.text}</p>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex gap-6 md:absolute md:left-[calc(18vw-4.75rem)] md:top-[42.25vw] md:mt-0">
        <CarouselPrevious aria-label="Previous place" className={control}><ChevronLeft aria-hidden="true" /></CarouselPrevious>
        <CarouselNext aria-label="Next place" className={control}><ChevronRight aria-hidden="true" /></CarouselNext>
      </div>
    </Carousel>
  );
}
