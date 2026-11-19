export type Photo = { src: string; alt: string; width: number; height: number };

const photo = (file: string, alt: string, width = 1440, height = 960): Photo => ({
  src: `/proto-listing/${file}.jpg`,
  alt,
  width,
  height,
});

export const photos = {
  aerialCreek: photo(
    "gallery-1",
    "The red lodge seen from above, tucked into tall spruce beside the creek with the Rockies behind",
    1440,
    1080,
  ),
  aerialLawn: photo(
    "gallery-2",
    "The back of the lodge from above: lawn, stone patio and red chairs running down to the creek",
    1440,
    1080,
  ),
  firePit: photo(
    "gallery-3",
    "Wicker armchairs around a lit fire pit on the stone patio, with the creek through the trees",
    1440,
    1084,
  ),
  rooftop: photo(
    "gallery-5",
    "The private rooftop terrace with a cedar hot tub and checked outdoor sofas",
    1440,
    1083,
  ),
  livingFireplace: photo(
    "living-1",
    "Living room with log ceiling beams, a stone fireplace and leather armchairs",
  ),
  livingWindows: photo(
    "living-2",
    "Second living room wrapped in windows, with a red sofa and two swivel armchairs",
  ),
  bedroom1: photo("bedroom-1", "Bedroom 1: a king platform bed and two navy armchairs"),
  bedroom2: photo("bedroom-2", "Bedroom 2: a king bed in a timber frame beside three windows"),
  bedroom3: photo("bedroom-3", "Bedroom 3: a log bunk bed, sofa bed, table and television"),
  bedroom4: photo(
    "bedroom-4",
    "Bedroom 4: a king bed in a round room under a domed ceiling painted with sky",
    1440,
    1084,
  ),
  bedroom5: photo("bedroom-5", "Bedroom 5: a queen bed with two armchairs and a mountain view"),
};

