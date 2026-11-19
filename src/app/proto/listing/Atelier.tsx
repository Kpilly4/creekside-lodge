"use client";

import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { LodgePhotoCarousel } from "@/app/proto/listing/LodgePhotoCarousel";
import { GatheringCarousel } from "@/app/proto/listing/GatheringCarousel";
import { BedroomCarousel } from "@/app/proto/listing/BedroomCarousel";
import { LodgeHeader } from "@/components/layouts/LodgeHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { protoFontVariables } from "@/app/proto/listing/fonts";
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
const availabilityButton = `${outlineButton} h-14 w-full max-w-[24rem] gap-3 rounded-none border-border bg-transparent px-10 py-3 font-normal shadow-none has-[>svg]:px-10 max-[360px]:tracking-[0.16em]`;

const navLinks = [
  ["#lodge", "The lodge"],
  ["#bedrooms", "Bedrooms"],
  ["#gather", "Gathering"],
  ["/gallery", "Gallery"],
  ["#reserve", "Reserve"],
] as const;

const heroPhotos = [
  photos.aerialLawn,
  photos.aerialCreek,
  photos.firePit,
  photos.livingFireplace,
  photos.rooftop,
];

const gatherings: { title: string; text: string; photo: Photo | null }[] = [
  {
    title: "The Rooftop",
    text: "A private terrace with a hot tub and outdoor sofas, open to the peaks.",
    photo: photos.rooftop,
  },
  {
    title: "The Fire Pit",
    text: "Armchairs on a stone patio beside the creek, with a BBQ area close by.",
    photo: photos.firePit,
  },
  {
    title: "The Pub",
    text: "A bar, a pool table, a poker table, a dartboard and games, down in the basement.",
    photo: null,
  },
  {
    title: "The Grounds",
    text: "A lawn among the evergreens that runs down to the water.",
    photo: photos.aerialCreek,
  },
];

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
  const [room, setRoom] = useState(0);

  return (
    <div id="top" className="proto-stage v-atelier">
      <LodgeHeader links={navLinks} />

      <main>
        <section className="grid gap-y-4 pb-16 pt-8 md:grid-cols-2 md:gap-y-8 md:pb-24 md:pt-16 lg:grid-rows-[auto_1fr] lg:pt-28">
          <div className={`${gutter} md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:pr-16`}>
            <h1 className="text-[clamp(2.625rem,12.3vw,2.875rem)] leading-[1.1] md:text-[clamp(2.75rem,4.4vw,3.75rem)]">
              The Full Retreat
            </h1>
          </div>
          <div className={`${gutter} md:pr-8 lg:col-start-1 lg:row-start-2 lg:pr-16`}>
            <Button asChild variant="outline" className={availabilityButton}>
              <a href="#reserve">
                Check availability
                <CalendarDays aria-hidden="true" strokeWidth={1.25} className="size-[18px] shrink-0" />
              </a>
            </Button>
            <div aria-hidden="true" className="mt-6 h-px max-w-[24rem] bg-border" />
            <p className="display mt-10 max-w-[22ch] text-2xl leading-[1.25] text-primary md:mt-9 lg:mt-12">
              Two homes beside a creek in the Rockies, joined into one five-bedroom lodge for
              sixteen.
            </p>
            <p className={`${copy} ${indent} mt-10 max-w-[30rem] md:mt-8 lg:mt-12`}>
              A private rooftop hot tub, a pub in the basement and Canmore’s Main Street one block
              from the door.
            </p>
          </div>

          <div className="mt-8 min-w-0 md:mt-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <LodgePhotoCarousel photos={heroPhotos} />
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
            <Button asChild variant="outline" className={`${availabilityButton} mt-12`}>
              <a href="#reserve">
                Check availability
                <CalendarDays aria-hidden="true" strokeWidth={1.25} className="size-[18px] shrink-0" />
              </a>
            </Button>
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
              <p className="display mb-4 text-2xl leading-[1.25] text-primary">The Lodge</p>
              <TextBlock
                title={
                  <>
                    A Newly Updated <span className="md:block">Mountain Home</span>
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
                    More About <span className="md:block">The Lodge</span>
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
                      className="group grid min-h-14 w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-3 py-3 text-left transition-colors duration-150 ease-out hover:text-primary aria-pressed:font-medium aria-pressed:text-primary"
                    >
                      <span className="display text-xl tabular-nums group-aria-pressed:[-webkit-text-stroke:0.25px_currentColor]">
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
            <div className="min-w-0">
              <BedroomCarousel rooms={bedrooms} selectedIndex={room} onSelect={setRoom} />
            </div>
          </div>
        </section>

        <section id="gather" className="py-16 md:py-28">
          <div className={gutter}>
            <h2 className={h2}>
              Places <span className="md:block">To Gather</span>
            </h2>
            <p className="display mt-8 max-w-[26ch] text-xl leading-[1.3]">
              A pub downstairs, a hot tub on the roof and a fire beside the creek
            </p>
          </div>
          <GatheringCarousel places={gatherings} />
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
            <p className="display text-4xl">Plan Your Stay</p>
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
    <section id="reserve" className="bg-card pb-32 pt-16 md:pb-36 md:pt-28">
      <div className={gutter}>
        <p className="display mb-4 text-2xl leading-[1.25] text-primary">Reserve</p>
        <h2 className={h2}>Check Availability</h2>
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
            <Select value={String(booking.guests)} onValueChange={(value) => booking.setGuests(Number(value))}>
              <SelectTrigger id="atelier-guests" className={`${field} text-foreground shadow-none data-[size=default]:h-[4.25rem] [&>svg]:size-5 [&>svg]:stroke-[1.25] [&>svg]:opacity-100`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                align="start"
                sideOffset={6}
                className={`${protoFontVariables} v-atelier max-h-72 w-[var(--radix-select-trigger-width)] rounded-xs border-border bg-card font-[family-name:var(--text-font)] text-foreground shadow-sm motion-reduce:animate-none`}
              >
                {guestOptions.map((count) => (
                  <SelectItem key={count} value={String(count)} className="min-h-11 rounded-xs py-3 pl-4 pr-10 text-base focus:bg-accent focus:text-foreground data-[state=checked]:font-medium data-[state=checked]:text-primary [&_svg]:text-primary">
                    {count} {count === 1 ? "guest" : "guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="inline-flex h-[4.25rem] items-center justify-center bg-foreground px-10 text-[13px] uppercase tracking-[0.22em] text-card transition-[color,background-color,border-color,transform] duration-150 ease-out hover:bg-primary active:scale-[0.96]"
          >
            Check availability
          </button>
        </form>

        <div aria-live="polite" className={booking.error || (quote && stage !== "editing") ? "mt-10" : undefined}>
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
