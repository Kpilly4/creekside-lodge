"use client";

import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { protoFontVariables } from "@/lib/fonts";
import { ListingBrand } from "@/components/layouts/ListingBrand";
import { Button } from "@/components/ui/button";

type MobileNavigationProps = {
  links: readonly (readonly [string, string])[];
  reserveHref?: string;
};

export function MobileNavigation({ links, reserveHref = "#reserve" }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button ref={triggerRef} type="button" aria-label="Open navigation menu" className="inline-flex size-11 shrink-0 items-center justify-center transition-colors hover:text-primary md:hidden">
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.25} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus({ preventScroll: true });
        }}
        className={`${protoFontVariables} proto-stage v-atelier w-full gap-0 overflow-y-auto border-0 px-6 shadow-none sm:max-w-none motion-reduce:animate-none motion-reduce:transition-none`}
      >
        <SheetHeader className="relative items-start border-b border-border pl-0 pr-14 py-7 text-left">
          <SheetTitle className="font-normal"><ListingBrand /></SheetTitle>
          <SheetDescription className="sr-only">Navigate Creekside Lodge</SheetDescription>
          <SheetClose asChild>
            <button type="button" aria-label="Close navigation menu" className="absolute right-0 top-5 inline-flex size-11 items-center justify-center transition-colors hover:text-primary">
              <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
            </button>
          </SheetClose>
        </SheetHeader>
        <nav aria-label="Mobile page sections" className="py-5">
          {links.map(([href, label]) => (
            <SheetClose key={href} asChild>
              <a href={href} className="block border-b border-border py-6 text-2xl uppercase tracking-[0.04em] transition-colors hover:text-primary">{label}</a>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Button asChild variant="outline" className="mt-6 h-22 w-full gap-3 rounded-none border-border bg-transparent px-5 text-lg font-normal uppercase tracking-[0.16em] text-foreground shadow-none hover:bg-foreground hover:text-card">
              <a href={reserveHref}>
                Check availability
                <CalendarDays aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={1.25} />
              </a>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
