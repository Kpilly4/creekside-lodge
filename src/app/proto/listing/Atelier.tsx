"use client";

import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { formatDate, guestOptions, useBooking } from "./booking";
import { bedrooms, lodge, money, type Photo, photos, pricing } from "./data";

// Direction: the Annandale pattern. Alternating soft grey and white bands, a
// thin display serif in slate, brown accents, a centred wordmark over a ruled
// nav, photographs that run off the page edge, and an indented first paragraph.
// Their scroll reveals, letter animations and drag cursor are left out.

const gutter = "px-[clamp(1.5rem,7.7vw,7rem)]";
const caps = "text-[13px] uppercase tracking-[0.04em]";
const h2 = "text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.15]";
const copy = "leading-[1.65]";
const indent = "md:pl-[4.5rem]";
const outlineButton =
  "inline-flex h-[4.25rem] items-center justify-center border border-foreground px-8 text-[13px] uppercase tracking-[0.22em] transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-foreground hover:text-card active:scale-[0.96]";

const navLinks = [
  ["#lodge", "The lodge"],
  ["#bedrooms", "Bedrooms"],
  ["#gather", "Gathering"],
  ["#reserve", "Reserve"],
];

const heroPhotos = [
  photos.aerialLawn,
  photos.aerialCreek,
  photos.firePit,
  photos.livingFireplace,
  photos.rooftop,
];

const gatherings: { title: string; text: string; photo: Photo | null }[] = [
  {
    title: "The rooftop",
    text: "A private terrace with a hot tub and outdoor sofas, open to the peaks.",
    photo: photos.rooftop,
  },
  {
    title: "The fire pit",
    text: "Armchairs on a stone patio beside the creek, with a BBQ area close by.",
    photo: photos.firePit,
  },
  {
    title: "The pub",
    text: "A bar, a pool table, a poker table, a dartboard and games, down in the basement.",
    photo: null,
  },
  {
    title: "The grounds",
    text: "A lawn among the evergreens that runs down to the water.",
    photo: photos.aerialCreek,
  },
];

/** A horizontal strip the visitor moves with the buttons, a swipe or the keyboard. */
function useStrip(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
    const update = () => {
      const items = Array.from(strip.children) as HTMLElement[];
      const origin = items[0]?.offsetLeft ?? 0;
      let nearest = 0;
      items.forEach((item, i) => {
        if (
          Math.abs(item.offsetLeft - origin - strip.scrollLeft) <
          Math.abs(items[nearest].offsetLeft - origin - strip.scrollLeft)
        )
          nearest = i;
      });
      setIndex(nearest);
      setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4);
    };
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = useCallback(
    (step: number) => {
      const strip = ref.current;
      if (!strip) return;
      const items = Array.from(strip.children) as HTMLElement[];
      const target = items[Math.min(count - 1, Math.max(0, index + step))];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      strip.scrollTo({
        left: target.offsetLeft - items[0].offsetLeft,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [count, index],
  );

  return { ref, index, atEnd, go };
}

function StripControls({
  strip,
  count,
  label,
}: {
  strip: ReturnType<typeof useStrip>;
  count: number;
  label: string;
}) {
  const round =
    "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-foreground/60 transition-[color,background-color,border-color,transform] duration-150 ease-out enabled:hover:bg-foreground enabled:hover:text-card enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground";
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        disabled={strip.index === 0}
        onClick={() => strip.go(-1)}
        className={round}
      >
        <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="size-5" />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        disabled={strip.atEnd || strip.index === count - 1}
        onClick={() => strip.go(1)}
        className={round}
      >
        <ChevronRight aria-hidden="true" strokeWidth={1.25} className="size-5" />
      </button>
    </div>
  );
}

function TextBlock({
  title,
  first,
  children,
}: {
  title: ReactNode;
  first: string;
  children?: ReactNode;
}) {
  return (
    <>
      <h2 className={h2}>{title}</h2>
      <p className={`${copy} ${indent} mt-10 max-w-[34rem]`}>{first}</p>
      {children && <div className={`${copy} mt-10 max-w-[34rem]`}>{children}</div>}
    </>
  );
}

export function Atelier() {
  const hero = useStrip(heroPhotos.length);
  const gather = useStrip(gatherings.length);
  const [room, setRoom] = useState(0);
  const activeRoom = bedrooms[room];

  return (
    <div id="top" className="proto-stage v-atelier">
      <header className="px-5">
        <div className="relative flex items-center justify-between gap-4 py-5 md:justify-center md:py-6">
          <a href="#top" className="py-1 md:text-center">
            <span className="display block text-[1.75rem] uppercase leading-none tracking-[0.08em] md:text-[2rem]">
              Creekside
            </span>
            <span className="mt-1.5 block whitespace-nowrap text-[10px] uppercase leading-none tracking-[0.24em]">
              Canmore · Alberta
            </span>
          </a>
          <a
            href="#reserve"
            className={`${caps} flex items-center gap-2.5 whitespace-nowrap py-3 text-xs transition-colors md:text-[13px] duration-150 ease-out hover:text-primary md:absolute md:right-0`}
          >
            Check availability
            <CalendarDays aria-hidden="true" strokeWidth={1.25} className="size-[18px] shrink-0" />
          </a>
        </div>
        <nav
          aria-label="Page sections"
          className={`${caps} no-scrollbar flex gap-x-9 overflow-x-auto border-y border-border md:justify-center md:gap-x-[4.5rem]`}
        >
          {navLinks.map(([href, text]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 py-5 transition-colors duration-150 ease-out hover:text-primary md:py-6"
            >
              {text}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="grid gap-y-12 pb-16 pt-14 md:grid-cols-2 md:pb-24 md:pt-28">
          <div className={`${gutter} md:pr-16`}>
            <h1 className="text-[clamp(2.75rem,4.4vw,3.75rem)] leading-[1.1] md:pl-4">
              The Full Retreat
            </h1>
            <p className={`${caps} mt-9 md:mt-12`}>
              Canmore <span aria-hidden="true">›</span> Creekside Lodge
            </p>
            <div aria-hidden="true" className="mt-6 h-px max-w-[24rem] bg-border" />
            <p className="display mt-10 max-w-[22ch] text-2xl leading-[1.25] text-primary md:mt-12">
              Two homes beside a creek in the Rockies, joined into one five-bedroom lodge for
              sixteen.
            </p>
            <p className={`${copy} ${indent} mt-10 max-w-[30rem] md:mt-12`}>
              A private rooftop hot tub, a pub in the basement and Canmore’s Main Street one block
              from the door.
            </p>
          </div>

          <div className="min-w-0">
            <div
              ref={hero.ref}
              role="group"
              aria-label="Photographs of the lodge"
              tabIndex={0}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 md:pl-0 md:pr-[7.7vw]"
            >
              {heroPhotos.map((photo, index) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 45vw, 85vw"
                  priority={index === 0}
                  className="h-[clamp(17rem,34vw,30rem)] w-auto max-w-none shrink-0 snap-start"
                />
              ))}
            </div>
            <div className="mt-8 flex items-center gap-6 px-6 md:mt-10 md:pl-0 md:pr-[7.7vw]">
              <div aria-hidden="true" className="relative h-0.5 flex-1 bg-accent">
                <span
                  className="absolute inset-y-0 left-0 bg-primary/60"
                  style={{ width: `${((hero.index + 1) / heroPhotos.length) * 100}%` }}
                />
              </div>
              <p className={`${caps} tabular-nums`} aria-live="polite">
                {String(hero.index + 1).padStart(2, "0")} /{" "}
                {String(heroPhotos.length).padStart(2, "0")}
              </p>
              <StripControls strip={hero} count={heroPhotos.length} label="photograph" />
            </div>
          </div>
        </section>

        <section className="grid items-start gap-y-12 bg-card py-16 md:grid-cols-[42%_58%] md:py-28">
          <div className={`${gutter} md:pr-12 md:pt-10`}>
            <h2 className={h2}>Features</h2>
            <dl className="mt-10 flex gap-12 text-primary">
              {[
                ["Rooms", lodge.bedrooms],
                ["Baths", lodge.baths],
                ["People max", lodge.guests],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col-reverse gap-4">
                  <dt className="text-xs uppercase tracking-[0.04em]">{term}</dt>
                  <dd className="display text-[3.25rem] leading-none">{value}</dd>
                </div>
              ))}
            </dl>
            <p className={`${copy} ${indent} mt-10 max-w-[24rem]`}>
              The whole property is yours: both homes, {lodge.beds} beds across five bedrooms,
              several lounges, a dining area for the full group and the grounds down to the water.
            </p>
            <a href="#reserve" className={`${outlineButton} mt-12`}>
              Check availability
            </a>
          </div>
          <Image
            src={photos.aerialCreek.src}
            alt={photos.aerialCreek.alt}
            width={photos.aerialCreek.width}
            height={photos.aerialCreek.height}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </section>

        <section id="lodge" className="py-16 md:py-28">
          <div className="grid items-center gap-y-12 md:grid-cols-2">
            <Image
              src={photos.livingWindows.src}
              alt={photos.livingWindows.alt}
              width={photos.livingWindows.width}
              height={photos.livingWindows.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover md:aspect-square"
            />
            <div className={`${gutter} md:pl-[8vw]`}>
              <TextBlock
                title={
                  <>
                    A newly updated <span className="md:block">mountain home</span>
                  </>
                }
                first="Log beams, a stone fireplace and timber-framed windows were kept. Around them the interior has been redone in a rustic mountain style."
              >
                <p>
                  There are several places to sit that are not all the same room, so sixteen
                  people can be together at dinner and apart for the rest of the afternoon.
                </p>
              </TextBlock>
            </div>
          </div>

          <div className="mt-20 grid items-center gap-y-12 md:mt-36 md:grid-cols-[57%_43%]">
            <div className={`${gutter} md:pr-[8vw]`}>
              <TextBlock
                title={
                  <>
                    More about <span className="md:block">the lodge</span>
                  </>
                }
                first="Every bedroom looks out at the Rockies, and the creek runs along the edge of the lawn."
              >
                <p>
                  Shops, restaurants and the Spring Creek Boardwalk are a short walk away. Once
                  you have arrived, the cars can stay parked.
                </p>
              </TextBlock>
            </div>
            <Image
              src={photos.livingFireplace.src}
              alt={photos.livingFireplace.alt}
              width={photos.livingFireplace.width}
              height={photos.livingFireplace.height}
              sizes="(min-width: 768px) 43vw, 100vw"
              className="aspect-[4/3] w-full object-cover md:aspect-[5/6]"
            />
          </div>
        </section>

        <section id="bedrooms" className="bg-card py-16 md:py-28">
          <div className={`${gutter} grid gap-x-[6vw] gap-y-10 md:grid-cols-[56%_1fr]`}>
            <div className="md:order-2">
              <h2 className={h2}>Bedrooms</h2>
              <p className={`${copy} ${indent} mt-8 max-w-[24rem]`}>
                Five bedrooms, each with a mountain view. Four sofa beds elsewhere in the house
                bring it to sixteen.
              </p>
              <ul className="mt-10 border-b border-border">
                {bedrooms.map((bedroom, index) => (
                  <li key={bedroom.name} className="border-t border-border">
                    <button
                      type="button"
                      aria-pressed={index === room}
                      onClick={() => setRoom(index)}
                      className="grid min-h-14 w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-3 text-left transition-colors duration-150 ease-out hover:text-primary aria-pressed:text-primary"
                    >
                      <span className="display text-xl tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className={caps}>{bedroom.name}</span>
                        <span className="block text-sm leading-6">{bedroom.beds}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <figure>
              {activeRoom.photo && (
                <Image
                  key={activeRoom.photo.src}
                  src={activeRoom.photo.src}
                  alt={activeRoom.photo.alt}
                  width={activeRoom.photo.width}
                  height={activeRoom.photo.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <figcaption aria-live="polite" className="display mt-5 text-xl text-primary">
                {activeRoom.note}
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="gather" className="py-16 md:py-28">
          <div className={gutter}>
            <h2 className={h2}>
              Places <span className="md:block">to gather</span>
            </h2>
            <p className="display mt-8 max-w-[26ch] text-xl leading-[1.3]">
              A pub downstairs, a hot tub on the roof and a fire beside the creek
            </p>
          </div>
          <div
            ref={gather.ref}
            role="group"
            aria-label="Places to gather"
            tabIndex={0}
            className="no-scrollbar mt-12 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain px-6 md:mt-16"
          >
            {gatherings.map((place, index) => (
              <article
                key={place.title}
                className={`relative isolate flex shrink-0 snap-start items-end overflow-hidden bg-footer text-footer-foreground ${
                  index % 2 === 0
                    ? "aspect-[4/5] w-[78vw] md:mt-14 md:aspect-[5/4] md:w-[36vw]"
                    : "aspect-[4/5] w-[78vw] md:aspect-[3/2] md:w-[50vw]"
                }`}
              >
                {place.photo && (
                  <Image
                    src={place.photo.src}
                    alt={place.photo.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 78vw"
                    className="-z-10 object-cover"
                  />
                )}
                <div
                  className={`w-full px-6 py-6 md:px-10 md:py-8 ${place.photo ? "bg-footer/85" : ""}`}
                >
                  <h3 className="text-3xl">{place.title}</h3>
                  <p className={`${copy} mt-3 max-w-[40ch] text-[15px]`}>{place.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={`${gutter} mt-10`}>
            <StripControls strip={gather} count={gatherings.length} label="place" />
          </div>
        </section>

        <Reserve />
      </main>

      <footer className="bg-footer text-footer-foreground [--focus-color:#fff]">
        <div className={`${gutter} py-16 md:py-24`}>
          <p className="display text-[2.5rem] uppercase leading-none tracking-[0.08em] md:text-[3.25rem]">
            Creekside
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em]">Canmore · Alberta</p>
        </div>
        <div
          className={`${gutter} grid gap-y-12 border-t border-footer-foreground/15 py-14 md:grid-cols-[1fr_1fr_2fr]`}
        >
          <div>
            <p className={caps}>Explore</p>
            <ul className={`${caps} mt-6 flex flex-col`}>
              {navLinks.map(([href, text]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-block py-2.5 text-footer-foreground/75 transition-colors duration-150 ease-out hover:text-footer-foreground"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={caps}>Details</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-footer-foreground/75">
              <li>{lodge.place}</li>
              <li>One block from Main Street</li>
              <li>Licences {lodge.licences.join(", ")}</li>
            </ul>
          </div>
          <div>
            <p className="display text-4xl">Plan your stay</p>
            <p className={`${copy} mt-5 max-w-[34ch] text-[15px] text-footer-foreground/85`}>
              Choose your dates and see the price for the whole lodge before you ask the group.
            </p>
            <a
              href="#reserve"
              className="mt-8 inline-flex h-[4.25rem] items-center justify-center bg-card px-8 text-[13px] uppercase tracking-[0.22em] text-foreground transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-accent active:scale-[0.96]"
            >
              Check availability
            </a>
          </div>
        </div>
        <div
          className={`${gutter} ${caps} flex flex-col gap-3 border-t border-footer-foreground/15 py-8 text-xs text-footer-foreground/75 md:flex-row md:justify-between`}
        >
          <p>{lodge.name}</p>
          <p>Prototype for review</p>
        </div>
      </footer>
    </div>
  );
}

const field =
  "h-[4.25rem] w-full rounded-none border border-input bg-card px-5 text-base [color-scheme:light] transition-colors duration-150 ease-out hover:border-foreground";

function Reserve() {
  const booking = useBooking();
  const { quote, stage } = booking;

  return (
    <section id="reserve" className="bg-card py-16 md:py-28">
      <div className={gutter}>
        <h2 className={h2}>Check availability</h2>
        <p className={`${copy} ${indent} mt-8 max-w-[30rem]`}>
          From {money(pricing.nightly)} a night for the whole lodge, with a {pricing.minNights}
          -night minimum. These are sample rates until live pricing is connected.
        </p>

        <form
          className="mt-12 grid items-end gap-4 md:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            booking.check();
          }}
          noValidate
        >
          <div>
            <label htmlFor="atelier-arrive" className={`${caps} mb-3 block`}>
              Arrive
            </label>
            <input
              id="atelier-arrive"
              type="date"
              min={booking.minDate}
              value={booking.checkIn}
              onChange={(event) => booking.setCheckIn(event.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="atelier-depart" className={`${caps} mb-3 block`}>
              Depart
            </label>
            <input
              id="atelier-depart"
              type="date"
              min={booking.checkIn || booking.minDate}
              value={booking.checkOut}
              onChange={(event) => booking.setCheckOut(event.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="atelier-guests" className={`${caps} mb-3 block`}>
              Guests
            </label>
            <div className="relative">
              <select
                id="atelier-guests"
                value={booking.guests}
                onChange={(event) => booking.setGuests(Number(event.target.value))}
                className={`${field} appearance-none pr-12`}
              >
                {guestOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.25}
                className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex h-[4.25rem] items-center justify-center bg-foreground px-10 text-[13px] uppercase tracking-[0.22em] text-card transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-primary active:scale-[0.96]"
          >
            Check availability
          </button>
        </form>

        <div aria-live="polite" className="mt-10 md:min-h-56">
          {booking.error && (
            <p role="alert" className="border-l-2 border-primary pl-4 text-primary">
              {booking.error}
            </p>
          )}

          {quote && stage !== "editing" && (
            <div className="grid gap-x-[6vw] gap-y-8 border-t border-border pt-10 md:grid-cols-[1fr_24rem]">
              <p className="display text-[clamp(2rem,3.4vw,3rem)] leading-[1.15]">
                {quote.nights} nights for {booking.guests} guests,{" "}
                <span className="tabular-nums text-primary">{money(quote.total)}</span>
              </p>
              <div>
                <dl className="flex flex-col gap-2 tabular-nums">
                  <div className="flex justify-between gap-6">
                    <dt>
                      {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}
                    </dt>
                    <dd>{money(quote.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Cleaning</dt>
                    <dd>{money(quote.cleaning)}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-t border-border pt-2">
                    <dt>Each, split {booking.guests} ways</dt>
                    <dd>{money(quote.perGuest)}</dd>
                  </div>
                </dl>
                {stage === "quoted" ? (
                  <button
                    type="button"
                    onClick={booking.reserve}
                    className={`${outlineButton} mt-8 w-full`}
                  >
                    Reserve these dates
                  </button>
                ) : (
                  <p className={`${copy} mt-8 border-l-2 border-primary pl-4`}>
                    Prototype stops here. In production this step opens the Hostaway checkout with
                    these dates and {booking.guests} guests.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
