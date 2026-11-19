// Throwaway prototype content. Facts come from the Airbnb listing; pricing is a
// placeholder until the Hostaway API supplies real rates.

import { photos, type Photo } from "@/lib/content/photography";
export { photos, type Photo } from "@/lib/content/photography";

export const lodge = {
  name: "Canmore Creekside Lodge",
  listingTitle: "Canmore Creekside Lodge | The Full Retreat",
  place: "Canmore, Alberta",
  guests: 16,
  bedrooms: 5,
  beds: 9,
  baths: 8,
  licences: ["RES-11446", "RES-11448"],
};

export type Room = {
  name: string;
  beds: string;
  /** Guests in real beds, guests on sofa beds. */
  inBeds: number;
  onSofaBeds: number;
  note: string;
  photo: Photo | null;
};

export const rooms: Room[] = [
  {
    name: "Bedroom 1",
    beds: "1 king",
    inBeds: 2,
    onSofaBeds: 0,
    note: "Platform bed, two armchairs, windows into the spruce.",
    photo: photos.bedroom1,
  },
  {
    name: "Bedroom 2",
    beds: "1 king",
    inBeds: 2,
    onSofaBeds: 0,
    note: "Timber bed frame and a wall of three windows.",
    photo: photos.bedroom2,
  },
  {
    name: "Bedroom 3",
    beds: "Twin XL over queen bunk, 1 sofa bed",
    inBeds: 3,
    onSofaBeds: 2,
    note: "The bunk room, with its own sofa, table and television.",
    photo: photos.bedroom3,
  },
  {
    name: "Bedroom 4",
    beds: "1 king",
    inBeds: 2,
    onSofaBeds: 0,
    note: "The round room, under a ceiling painted with sky.",
    photo: photos.bedroom4,
  },
  {
    name: "Bedroom 5",
    beds: "1 queen",
    inBeds: 2,
    onSofaBeds: 0,
    note: "Two armchairs and a straight view of the peaks.",
    photo: photos.bedroom5,
  },
  {
    name: "Living room 1",
    beds: "1 sofa bed",
    inBeds: 0,
    onSofaBeds: 2,
    note: "Log beams and the stone fireplace.",
    photo: photos.livingFireplace,
  },
  {
    name: "Living room 2",
    beds: "1 sofa bed",
    inBeds: 0,
    onSofaBeds: 2,
    note: "Windows on three sides.",
    photo: photos.livingWindows,
  },
  {
    name: "Common area",
    beds: "1 sofa bed",
    inBeds: 0,
    onSofaBeds: 2,
    note: "The fourth of the lodge’s four sofa beds.",
    photo: null,
  },
];

export const bedrooms = rooms.slice(0, 5);

export const amenityGroups = [
  {
    title: "Gathering",
    items: [
      "Large dining area",
      "Fully equipped kitchen",
      "Two living rooms",
      "Stone fireplace",
      "Dedicated workspace",
    ],
  },
  {
    title: "Basement pub",
    items: ["Bar", "Pool table", "Poker table", "Dartboard", "Games"],
  },
  {
    title: "Outdoors",
    items: [
      "Private rooftop hot tub",
      "Fire pit",
      "BBQ area",
      "Creekside patio and lawn",
      "Mountain views",
    ],
  },
  {
    title: "Practical",
    items: [
      "Wifi",
      "Free parking on the premises",
      "8 bathrooms",
      "Exclusive use of both homes",
      "One block from Main Street",
    ],
  },
];

// Placeholder rates. Replace with the Hostaway listing calendar and price API.
export const pricing = {
  currency: "CAD",
  nightly: 2400,
  cleaning: 600,
  minNights: 2,
};

export const money = (amount: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
