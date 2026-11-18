"use client";

import {
  Beer,
  Check,
  ChevronDown,
  CircleAlert,
  Flame,
  MapPin,
  Mountain,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { formatDate, guestOptions, useBooking } from "./booking";
import { amenityGroups, bedrooms, lodge, money, type Photo, photos, pricing } from "./data";

// Direction: the conventional villa page, on the repo's existing theme. Hero,
// booking bar, intro, features, alternating image and text, amenities, CTA.
// Two fonts and four text styles only: display, heading, eyebrow, body.

const heading = "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.02em]";
const body = "leading-8 text-muted-foreground";
const button =
  "inline-flex h-12 items-center justify-center bg-primary px-7 text-sm font-medium tracking-wide text-primary-foreground transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-accent-foreground active:scale-[0.96]";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MapPin,
    title: "One block from Main Street",
    text: "Walk to shops, restaurants and the Spring Creek Boardwalk.",
  },
  {
    icon: Waves,
    title: "Private rooftop hot tub",
    text: "A terrace of your own, open to the mountains.",
  },
  {
    icon: Beer,
    title: "Basement pub",
    text: "Bar, pool table, poker table, dartboard and games.",
  },
  {
    icon: Utensils,
    title: "A table for the whole group",
    text: "A large dining area beside a fully equipped kitchen.",
  },
  {
    icon: Flame,
    title: "Fire pit by the creek",
    text: "A stone patio, a BBQ area and a lawn among the evergreens.",
  },
  {
    icon: Mountain,
    title: "Rockies from every bedroom",
    text: "Five bedrooms, each with a mountain view.",
  },
];

function Photograph({
  photo,
  className,
  sizes,
}: {
  photo: Photo;
  className?: string;
  sizes: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      className={className}
    />
  );
}

export function Classic() {
  return (
    <div id="top" className="proto-stage v-classic">
      <header className="page-gutter sticky top-0 z-10 flex items-center justify-between gap-6 border-b border-border bg-background py-3">
        <a href="#top" aria-label="Creekside Lodge, back to top" className="inline-flex shrink-0">
          <Image
            src="/images/creekside-mark.png"
            alt=""
            width={1637}
            height={960}
            priority
            className="no-outline h-auto w-20"
          />
        </a>
        <nav aria-label="Page sections" className="hidden gap-9 text-sm md:flex">
          {[
            ["#lodge", "The lodge"],
            ["#bedrooms", "Bedrooms"],
            ["#outdoors", "Outdoors"],
            ["#amenities", "Amenities"],
          ].map(([href, text]) => (
            <a
              key={href}
              href={href}
              className="py-3 transition-colors duration-150 ease-out hover:text-primary"
            >
              {text}
            </a>
          ))}
        </nav>
        <a href="#reserve" className={button}>
          Reserve
        </a>
      </header>

      <main>
        <section className="relative isolate flex min-h-[78svh] items-end">
          <Image
            src={photos.aerialLawn.src}
            alt={photos.aerialLawn.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#1b1f18]/85 via-[#1b1f18]/35 to-transparent"
          />
          <div className="page-gutter w-full pb-12 pt-40 text-[#f6f3ed] md:pb-16">
            <p className="eyebrow">{lodge.place}</p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.03em]">
              A creekside retreat for the whole group
            </h1>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm tracking-wide">
              <li>{lodge.guests} guests</li>
              <li>{lodge.bedrooms} bedrooms</li>
              <li>{lodge.beds} beds</li>
              <li>{lodge.baths} bathrooms</li>
            </ul>
          </div>
        </section>

        <BookingBar />

        <section id="lodge" className="page-gutter py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">The lodge</p>
            <h2 className={`${heading} mt-5`}>
              Two homes beside the creek, <span className="italic">yours entirely</span>
            </h2>
            <div className={`${body} mx-auto mt-8 flex max-w-[62ch] flex-col gap-8`}>
              <p>
                {lodge.name} joins two homes into one retreat for up to sixteen. The interior is
                newly updated in a rustic mountain style, with log beams overhead, a stone
                fireplace, and several living areas so the group can spread out.
              </p>
              <p>
                You have exclusive use of the whole property: the rooftop hot tub, the pub
                downstairs, and the patio and lawn that run down to the water.
              </p>
            </div>
          </div>

          <ul className="mx-auto mt-16 grid max-w-6xl gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-x-4 border-t border-border pt-6">
                <Icon aria-hidden="true" strokeWidth={1.25} className="mt-1 size-6 text-primary" />
                <div>
                  <h3 className="text-2xl leading-tight">{title}</h3>
                  <p className={`${body} mt-2 text-sm leading-7`}>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Photographs" className="page-gutter">
          <div className="grid gap-4 sm:grid-cols-3">
            {[photos.livingWindows, photos.bedroom4, photos.firePit].map((photo) => (
              <Photograph
                key={photo.src}
                photo={photo}
                sizes="(min-width: 640px) 30vw, 100vw"
                className="aspect-[4/3] w-full object-cover sm:aspect-[4/5]"
              />
            ))}
          </div>
        </section>

        <section className="page-gutter py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-x-16 gap-y-10 md:grid-cols-2">
            <Photograph
              photo={photos.livingFireplace}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="w-full"
            />
            <div>
              <p className="eyebrow text-primary">Living spaces</p>
              <h2 className={`${heading} mt-5`}>Room to gather, room to wander off</h2>
              <p className={`${body} mt-6 max-w-[52ch]`}>
                Two living rooms, a large dining area and a full kitchen share the main floors.
                Downstairs, the basement pub has a bar, a pool table, a poker table, a dartboard
                and games for the evenings that run long.
              </p>
              <a
                href="#amenities"
                className="mt-8 inline-flex py-3 text-sm font-medium text-primary underline decoration-1 underline-offset-8 transition-colors duration-150 ease-out hover:text-foreground"
              >
                See all amenities
              </a>
            </div>
          </div>
        </section>

        <section id="bedrooms" className="page-gutter bg-secondary py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="eyebrow text-primary">Bedrooms</p>
              <h2 className={`${heading} mt-5`}>Five bedrooms, every one with a view</h2>
              <p className={`${body} mt-6`}>
                {lodge.beds} beds across five bedrooms and {lodge.baths} bathrooms. Four sofa beds,
                in Bedroom 3, both living rooms and the common area, bring the lodge to sixteen.
              </p>
            </div>
            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {bedrooms.map(
                (room) =>
                  room.photo && (
                    <li key={room.name}>
                      <Photograph
                        photo={room.photo}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="aspect-[3/2] w-full object-cover"
                      />
                      <h3 className="mt-5 text-2xl leading-tight">{room.name}</h3>
                      <p className="mt-1 text-sm font-medium">{room.beds}</p>
                      <p className={`${body} mt-2 text-sm leading-7`}>{room.note}</p>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </section>

        <section id="outdoors" className="page-gutter py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-x-16 gap-y-10 md:grid-cols-2">
            <div className="md:order-2">
              <Photograph
                photo={photos.rooftop}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="w-full"
              />
            </div>
            <div>
              <p className="eyebrow text-primary">Outdoors</p>
              <h2 className={`${heading} mt-5`}>A rooftop hot tub and a fire by the water</h2>
              <p className={`${body} mt-6 max-w-[52ch]`}>
                The private rooftop terrace has a hot tub and outdoor seating with mountain views.
                At ground level, a stone patio with a fire pit, a BBQ area and a lawn sit among the
                evergreens beside the creek.
              </p>
            </div>
          </div>
        </section>

        <section id="amenities" className="page-gutter border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow text-primary">Amenities</p>
            <h2 className={`${heading} mt-5`}>What is here when you arrive</h2>
            <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {amenityGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="border-b border-border pb-3 text-2xl">{group.title}</h3>
                  <ul className="mt-4 flex flex-col gap-3 text-sm">
                    {group.items.map((item) => (
                      <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-2 leading-6">
                        <Check
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="mt-1 size-4 text-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-gutter bg-primary py-20 text-center [--focus-color:var(--primary-foreground)] text-primary-foreground md:py-28">
          <p className="eyebrow">{lodge.place}</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.025em]">
            Your group’s place in the mountains <span className="italic">is waiting</span>
          </h2>
          <a
            href="#reserve"
            className="mt-10 inline-flex h-12 items-center justify-center bg-primary-foreground px-8 text-sm font-medium tracking-wide text-accent-foreground transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-accent active:scale-[0.96]"
          >
            Check availability
          </a>
        </section>
      </main>

      <footer className="page-gutter flex flex-col gap-3 bg-footer py-8 text-footer-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">{lodge.name}</p>
        <p className="text-xs tracking-wide text-footer-foreground/75">
          Licences {lodge.licences.join(" and ")}
        </p>
      </footer>
    </div>
  );
}

const control =
  "h-12 w-full rounded-sm border border-input bg-background px-3 text-base [color-scheme:light] transition-colors duration-150 ease-out hover:border-foreground";

function BookingBar() {
  const booking = useBooking();
  const { quote, stage } = booking;

  return (
    <section id="reserve" aria-labelledby="classic-reserve-title" className="page-gutter bg-muted py-8">
      <div className="mx-auto max-w-6xl">
        <form
          className="grid items-end gap-4 md:grid-cols-[1.3fr_1fr_1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            booking.check();
          }}
          noValidate
        >
          <div className="md:pb-1">
            <h2 id="classic-reserve-title" className="text-3xl leading-none">
              Plan your stay
            </h2>
            <p className="mt-2 text-sm text-muted-foreground tabular-nums">
              From {money(pricing.nightly)} a night, sample rate
            </p>
          </div>
          <div>
            <label htmlFor="classic-arrive" className="text-sm font-medium">
              Check in
            </label>
            <input
              id="classic-arrive"
              type="date"
              min={booking.minDate}
              value={booking.checkIn}
              onChange={(event) => booking.setCheckIn(event.target.value)}
              className={`${control} mt-2`}
            />
          </div>
          <div>
            <label htmlFor="classic-depart" className="text-sm font-medium">
              Check out
            </label>
            <input
              id="classic-depart"
              type="date"
              min={booking.checkIn || booking.minDate}
              value={booking.checkOut}
              onChange={(event) => booking.setCheckOut(event.target.value)}
              className={`${control} mt-2`}
            />
          </div>
          <div>
            <label htmlFor="classic-guests" className="text-sm font-medium">
              Guests
            </label>
            <div className="relative mt-2">
            <select
              id="classic-guests"
              value={booking.guests}
              onChange={(event) => booking.setGuests(Number(event.target.value))}
              className={`${control} appearance-none pr-10`}
            >
              {guestOptions.map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
          <button type="submit" className={button}>
            Check availability
          </button>
        </form>

        <div aria-live="polite">
          {booking.error && (
            <p
              role="alert"
              className="mt-6 flex items-start gap-2 border-t border-border pt-6 text-sm font-medium leading-6 text-destructive md:min-h-[4.75rem]"
            >
              <CircleAlert aria-hidden="true" className="mt-1 size-4 shrink-0" />
              {booking.error}
            </p>
          )}

          {quote && stage !== "editing" && (
            <div className="mt-6 flex flex-col gap-6 border-t border-border pt-6 md:min-h-[4.75rem] md:flex-row md:items-center md:justify-between">
              <div>
                <p className="display font-serif text-3xl leading-tight tabular-nums">
                  {money(quote.total)}{" "}
                  <span className="italic text-primary">for {quote.nights} nights</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground tabular-nums">
                  {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)} ·{" "}
                  {money(quote.subtotal)} stay + {money(quote.cleaning)} cleaning · about{" "}
                  {money(quote.perGuest)} each for {booking.guests}
                </p>
              </div>
              {stage === "quoted" ? (
                <button type="button" onClick={booking.reserve} className={`${button} shrink-0`}>
                  Reserve these dates
                </button>
              ) : (
                <p className="max-w-[40ch] border-l-2 border-primary pl-4 text-sm leading-6">
                  Prototype stops here. In production this step opens the Hostaway checkout with
                  these dates and {booking.guests} guests.
                </p>
              )}
            </div>
          )}

          {!(quote && stage !== "editing") && !booking.error && (
            <p className="mt-6 border-t border-border pt-6 text-sm leading-6 text-muted-foreground md:min-h-[4.75rem]">
              Choose your dates to see the total for the stay and what it comes to per guest.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
