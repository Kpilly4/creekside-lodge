import { ListingBrand } from "@/components/layouts/ListingBrand";
import { MobileNavigation } from "@/components/layouts/navigation/MobileNavigation";

type LodgeHeaderProps = {
  links: readonly (readonly [string, string])[];
  homeHref?: string;
  reserveHref?: string;
  currentHref?: string;
};

export function LodgeHeader({ links, homeHref = "#top", reserveHref = "#reserve", currentHref }: LodgeHeaderProps) {
  return (
    <header className="px-5">
      <div className="flex items-center justify-between gap-4 py-5 md:justify-center md:py-6">
        <a href={homeHref} className="py-1" aria-label="Creekside Lodge home"><ListingBrand /></a>
        <MobileNavigation links={links} reserveHref={reserveHref} />
      </div>
      <nav aria-label="Main navigation" className="hidden justify-center gap-x-[clamp(2rem,6vw,4.5rem)] border-y border-border text-[13px] uppercase tracking-[0.04em] md:flex">
        {links.map(([href, label]) => (
          <a key={href} href={href} aria-current={href === currentHref ? "page" : undefined} className="py-6 transition-colors hover:text-primary aria-[current=page]:text-primary">{label}</a>
        ))}
      </nav>
    </header>
  );
}
