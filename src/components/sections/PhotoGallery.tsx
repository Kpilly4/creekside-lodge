import Image from "next/image";
import type { Photo } from "@/lib/content/photography";

type PhotoGalleryProps = { photos: readonly (Photo & { objectPosition?: string })[] };

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const groups = Array.from({ length: Math.ceil(photos.length / 3) }, (_, index) => photos.slice(index * 3, index * 3 + 3));

  return (
    <div className="gallery-mosaic">
      {groups.map((group, groupIndex) => (
        <div key={group[0].src} className="gallery-group" data-reversed={groupIndex % 2 === 1} data-count={group.length}>
          {group.map((photo, index) => (
            <figure key={photo.src} className="gallery-photo">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={groupIndex === 0 && index === 0}
                sizes={group.length === 2 ? "(min-width: 768px) 47vw, 45vw" : index === 0 ? "(min-width: 768px) 64vw, 95vw" : "(min-width: 768px) 31vw, 45vw"}
                className="object-cover"
                style={{ objectPosition: photo.objectPosition }}
              />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
