import photos from "@/app/gallery/photos.json";

export const galleryPhotos = photos;

const listing = "/proto/listing?v=1";
export const galleryNavigation = [
  [`${listing}#lodge`, "The Lodge"],
  [`${listing}#bedrooms`, "Bedrooms"],
  [`${listing}#gather`, "Gathering"],
  ["/gallery", "Gallery"],
  [`${listing}#reserve`, "Reserve"],
] as const;
export const listingHref = listing;
