import type { Metadata } from "next";
import { LodgeHeader } from "@/components/layouts/LodgeHeader";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { protoFontVariables } from "@/lib/fonts";
import { galleryNavigation, galleryPhotos, listingHref } from "@/app/gallery/content";
import "@/app/proto/listing/proto.css";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery | Creekside Lodge",
  description: "Explore Creekside Lodge in Canmore: the bedrooms, gathering spaces, rooftop terrace and grounds beside the creek.",
};

export default function GalleryPage() {
  return (
    <div id="top" className={`${protoFontVariables} proto-stage v-atelier min-h-svh`}>
      <a href="#gallery" className="skip-link">Skip to gallery</a>
      <LodgeHeader links={galleryNavigation} homeHref={listingHref} reserveHref={`${listingHref}#reserve`} currentHref="/gallery" />
      <main id="gallery">
        <h1 className="sr-only">Creekside Lodge Gallery</h1>
        <PhotoGallery photos={galleryPhotos} />
      </main>
      <footer className="flex flex-col gap-6 bg-footer px-[clamp(1.5rem,7.7vw,7rem)] py-12 text-footer-foreground sm:flex-row sm:items-center sm:justify-between">
        <div><p className="display text-3xl">Creekside Lodge</p><p className="mt-2 text-xs uppercase tracking-[0.2em]">Canmore · Alberta</p></div>
        <a href={`${listingHref}#reserve`} className="inline-flex min-h-12 w-fit items-center border border-footer-foreground/40 px-7 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-footer-foreground hover:text-footer">Plan Your Stay</a>
      </footer>
    </div>
  );
}
