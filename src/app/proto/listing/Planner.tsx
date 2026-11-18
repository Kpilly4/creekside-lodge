"use client";

import {
  Award,
  Car,
  Check,
  ChevronDown,
  CircleAlert,
  Footprints,
  KeyRound,
  Minus,
  Plus,
  ScrollText,
  Waves,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Booking, formatDate, useBooking } from "./booking";
import { lodge, money, type Photo, photos, pricing, rooms } from "./data";

// Direction: a small site built around the person organising the trip. Beyond
// describing the lodge it does work for them: the cost per person, who sleeps
// where, what kind of trip it suits, a sample weekend and what is nearby.

const wrap = "page-gutter mx-auto max-w-[1360px]";
const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.12em] text-primary";
const title = "text-[clamp(1.875rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]";
const lede = "mt-4 max-w-[60ch] text-[17px] leading-7 text-muted-foreground";
const small = "text-sm leading-6 text-muted-foreground";
const press = "transition-[color,background-color,border-color,transform] duration-150 ease-out";
const primaryButton = `inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 text-[15px] font-semibold text-primary-foreground hover:bg-foreground active:scale-[0.96] ${press}`;
const chip = `inline-flex h-11 items-center rounded-sm border border-input px-4 text-[15px] font-medium hover:border-foreground active:scale-[0.96] aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground ${press}`;

const sections = [
  ["#plan", "Plan your stay"],
  ["#lodge", "The lodge"],
  ["#trips", "Trip types"],
  ["#weekend", "A weekend"],
  ["#canmore", "Canmore"],
  ["#faq", "Questions"],
];
const sectionIds = sections.map(([href]) => href.slice(1));

/** The section currently under the sticky header, so the nav can mark it. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= 170) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return active;
}

const realBedCapacity = rooms.reduce((sum, room) => sum + room.inBeds, 0);
const sofaBedRooms = rooms.filter((room) => room.onSofaBeds > 0);

function bedPlan(guests: number) {
  const onSofaBeds = Math.max(0, guests - realBedCapacity);
  return {
    inBeds: guests - onSofaBeds,
    onSofaBeds,
    sofaRoomsInUse: sofaBedRooms.slice(0, Math.ceil(onSofaBeds / 2)).map((room) => room.name),
  };
}

const proof: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: KeyRound, title: "The whole property", text: "Both homes and the grounds, only your group." },
  { icon: Waves, title: "Rooftop hot tub", text: "Private, with mountain views." },
  { icon: Award, title: "Superhost", text: "4.99 across 157 reviews of their other stays." },
  { icon: ScrollText, title: "Licensed", text: lodge.licences.join(" and ") },
];

const levels: { level: string; photo: Photo | null; text: string; items: string[] }[] = [
  {
    level: "Rooftop",
    photo: photos.rooftop,
    text: "Where the day ends.",
    items: ["Private hot tub", "Outdoor sofas", "Mountain views"],
  },
  {
    level: "Main floors",
    photo: photos.livingFireplace,
    text: "Where everyone meets.",
    items: [
      "Two living rooms",
      "Stone fireplace",
      "Large dining area",
      "Fully equipped kitchen",
      "Dedicated workspace",
    ],
  },
  {
    level: "Basement pub",
    photo: null,
    text: "Where the noise can stay.",
    items: ["Bar", "Pool table", "Poker table", "Dartboard", "Games"],
  },
  {
    level: "Creekside grounds",
    photo: photos.firePit,
    text: "Where the mornings start.",
    items: ["Fire pit on a stone patio", "BBQ area", "Lawn among the evergreens"],
  },
];

const tripTypes = [
  {
    name: "Family reunion",
    line: "Three generations, one address.",
    photo: photos.aerialLawn,
    points: [
      "King rooms with a view for the grandparents; the bunk room, with its own television, for the kids.",
      "One table that seats everyone, beside a full kitchen.",
      "A lawn, a fire pit and a creek, so nobody needs driving anywhere.",
    ],
  },
  {
    name: "Ski week",
    line: "Four ski areas within about an hour.",
    photo: photos.rooftop,
    points: [
      "Norquay, Sunshine, Nakiska and Lake Louise are all a day trip.",
      "A rooftop hot tub to come back to.",
      "A pub downstairs, so the evening does not need a reservation.",
    ],
  },
  {
    name: "Milestone weekend",
    line: "The whole party under one roof.",
    photo: photos.firePit,
    points: [
      "Sixteen people stay together instead of across four hotel floors.",
      "Pool, poker and darts in the basement pub.",
      "Main Street’s restaurants are one block away.",
    ],
  },
  {
    name: "Team offsite",
    line: "Work in the morning, mountains after lunch.",
    photo: photos.livingWindows,
    points: [
      "Wifi and a dedicated workspace.",
      "Two living rooms for splitting into groups.",
      "Dinner at one table, then the fire pit.",
    ],
  },
];

const weekend = [
  {
    day: "Friday",
    steps: [
      ["Arrive", "Park on the premises and hand out rooms from the bed plan."],
      ["Dinner", "Walk one block to Main Street. No cars, no designated driver."],
      ["Late", "Pool, poker and darts in the pub downstairs."],
    ],
  },
  {
    day: "Saturday",
    steps: [
      ["Morning", "Out to the mountains: a trail in summer, a ski hill in winter."],
      ["Afternoon", "Back for the rooftop hot tub while the peaks are still lit."],
      ["Evening", "BBQ, one long table, then the fire pit by the creek."],
    ],
  },
  {
    day: "Sunday",
    steps: [
      ["Morning", "A slow breakfast from the full kitchen."],
      ["Midday", "A last walk along the Spring Creek Boardwalk."],
      ["Afternoon", "Pack up and settle the split."],
    ],
  },
];

type Place = { name: string; what: string; time: string; season?: "summer" | "winter" };
const onFoot: Place[] = [
  { name: "Main Street", what: "Shops, cafés and restaurants", time: "1 block" },
  { name: "Spring Creek Boardwalk", what: "A flat walk along the water", time: "Short walk" },
];
const byCar: Place[] = [
  { name: "Canmore Nordic Centre", what: "Trails for skiing, biking and walking", time: "10 min" },
  { name: "Grassi Lakes", what: "A short hike to two clear lakes", time: "10 min", season: "summer" },
  { name: "Quarry Lake", what: "Swimming and picnics", time: "10 min", season: "summer" },
  { name: "Banff townsite", what: "The national park’s main town", time: "25 min" },
  { name: "Mt Norquay", what: "Skiing above Banff", time: "30 min", season: "winter" },
  { name: "Banff Sunshine", what: "Skiing on the Continental Divide", time: "40 min", season: "winter" },
  { name: "Nakiska", what: "Skiing in Kananaskis", time: "45 min", season: "winter" },
  { name: "Lake Louise", what: "The lake in summer, the ski resort in winter", time: "1 hr" },
  { name: "Calgary airport", what: "YYC, the nearest major airport", time: "1 hr 15" },
];

const faqs = [
  [
    "How many people does the lodge sleep?",
    `Up to ${lodge.guests}. ${realBedCapacity} sleep in beds across the five bedrooms, and four sofa beds cover the rest. The bed plan above shows how it works for your group size.`,
  ],
  [
    "Do we share the property with other guests?",
    "No. A booking covers both homes and the grounds, for your group only.",
  ],
  [
    "How many bathrooms are there?",
    `${lodge.baths}, so mornings do not need a schedule.`,
  ],
  [
    "Where exactly is it?",
    "One block from Main Street in downtown Canmore. The exact address is sent once the booking is confirmed.",
  ],
  ["Is there parking?", "Yes, free parking on the premises."],
  ["Is the hot tub private?", "Yes. It is on the lodge’s own rooftop terrace."],
  [
    "Is the lodge licensed for short stays?",
    `Yes, under licences ${lodge.licences.join(" and ")}.`,
  ],
];

export function Planner() {
  const booking = useBooking();
  const activeSection = useActiveSection();
  const stripRef = useRef<HTMLElement>(null);

  // Keep the marked tab in view when the strip overflows on a phone.
  useEffect(() => {
    const strip = stripRef.current;
    const link = strip?.querySelector<HTMLElement>("[aria-current]");
    if (!strip || !link || strip.scrollWidth <= strip.clientWidth) return;
    const offset = link.getBoundingClientRect().left - strip.getBoundingClientRect().left;
    strip.scrollTo({ left: strip.scrollLeft + offset - 24 });
  }, [activeSection]);

  const navLinks = sections.map(([href, text]) => (
    <a
      key={href}
      href={href}
      aria-current={activeSection === href.slice(1) ? "location" : undefined}
      className="shrink-0 whitespace-nowrap py-3 text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground aria-[current]:text-foreground aria-[current]:shadow-[inset_0_-2px_0_var(--primary)]"
    >
      {text}
    </a>
  ));

  return (
    <div id="top" className="proto-stage v-planner">
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a href="#top" className="flex items-center gap-2 py-1 sm:gap-3">
            <Image
              src="/images/creekside-mark.png"
              alt=""
              width={1637}
              height={960}
              priority
              className="no-outline h-auto w-11 sm:w-14"
            />
            <span className="display whitespace-nowrap text-lg font-medium tracking-[-0.01em] sm:text-xl">
              Creekside Lodge
            </span>
          </a>
          <nav aria-label="Site" className="hidden gap-7 lg:flex">
            {navLinks}
          </nav>
          <a href="#plan" className={`${primaryButton} h-11 shrink-0 px-4 sm:px-5`}>
            Check dates
          </a>
        </div>
        <div className="border-t border-border lg:hidden">
          <nav
            ref={stripRef}
            aria-label="Site sections"
            className={`${wrap} no-scrollbar flex gap-7 overflow-x-auto`}
          >
            {navLinks}
          </nav>
        </div>
      </header>

      <main>
        <section className={`${wrap} grid items-center gap-x-14 gap-y-10 py-10 lg:grid-cols-[1fr_1.15fr] lg:py-16`}>
          <div>
            <p className={eyebrow}>{lodge.place} · Entire lodge</p>
            <h1 className="mt-4 text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[1.04] tracking-[-0.025em]">
              The whole lodge for the whole group.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-7 text-muted-foreground">
              Two homes by the creek, booked as one: five bedrooms, a rooftop hot tub and a pub in
              the basement, one block from Main Street. Work out the dates, the cost per person
              and who sleeps where before you message the group.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#plan" className={primaryButton}>
                Plan your stay
              </a>
              <a
                href="#lodge"
                className="py-3 text-[15px] font-semibold underline decoration-1 underline-offset-[6px] transition-colors duration-150 ease-out hover:text-primary"
              >
                See the lodge
              </a>
            </div>
            <dl className="mt-9 flex flex-wrap gap-x-9 gap-y-4 border-t border-border pt-6">
              {[
                ["Guests", lodge.guests],
                ["Bedrooms", lodge.bedrooms],
                ["Beds", lodge.beds],
                ["Bathrooms", lodge.baths],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col-reverse">
                  <dt className={small}>{term}</dt>
                  <dd className="display text-3xl font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-2 sm:aspect-[3/2]">
            {[photos.aerialLawn, photos.rooftop, photos.firePit].map((photo, index) => (
              <div
                key={photo.src}
                className={`relative overflow-hidden rounded-sm ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "(min-width: 1024px) 36vw, 66vw" : "(min-width: 1024px) 18vw, 33vw"}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Why this lodge" className="border-y border-border">
          <ul className={`${wrap} grid sm:grid-cols-2 lg:grid-cols-4`}>
            {proof.map(({ icon: Icon, title: heading, text }) => (
              <li key={heading} className="grid grid-cols-[1.75rem_1fr] gap-x-3 py-5 lg:pr-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-[15px] font-semibold">{heading}</p>
                  <p className={small}>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="plan" className="bg-muted py-14 lg:py-20">
          <div className={wrap}>
            <p className={eyebrow}>Plan your stay</p>
            <h2 className={`${title} mt-3`}>Settle the two questions every group asks</h2>
            <p className={lede}>
              What does it cost each of us, and where do I sleep? Set the dates and the head count
              once; both answers update together.
            </p>
            <div className="mt-9 grid items-start gap-6 lg:grid-cols-[24rem_1fr]">
              <CostCard booking={booking} />
              <BedPlanCard booking={booking} />
            </div>
          </div>
        </section>

        <section id="lodge" className={`${wrap} py-14 lg:py-20`}>
          <p className={eyebrow}>The lodge</p>
          <h2 className={`${title} mt-3`}>Four levels, each with a job</h2>
          <p className={lede}>
            A newly updated mountain home with room for sixteen to be together, and enough
            separate corners that they do not have to be.
          </p>
          <ul className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level) => (
              <li key={level.level}>
                {level.photo ? (
                  <Image
                    src={level.photo.src}
                    alt={level.photo.alt}
                    width={level.photo.width}
                    height={level.photo.height}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[4/3] w-full rounded-sm object-cover"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label="The basement pub, not yet photographed"
                    className="flex aspect-[4/3] select-none items-end rounded-sm bg-primary p-5 text-primary-foreground"
                  >
                    <span className="display text-4xl font-medium leading-none">
                      Pool.
                      <br />
                      Poker.
                      <br />
                      Darts.
                    </span>
                  </div>
                )}
                <h3 className="mt-4 text-xl font-medium">{level.level}</h3>
                <p className={small}>{level.text}</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-[15px] leading-6">
                  {level.items.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-2">
                      <Check aria-hidden="true" className="mt-1 size-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <TripTypes />

        <section id="weekend" className={`${wrap} py-14 lg:py-20`}>
          <p className={eyebrow}>A weekend</p>
          <h2 className={`${title} mt-3`}>How two nights here tend to go</h2>
          <p className={lede}>A starting point to forward to the group, not a schedule.</p>
          <ol className="mt-9 grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {weekend.map((day) => (
              <li key={day.day} className="border-t-2 border-primary pt-4">
                <h3 className="text-2xl font-medium">{day.day}</h3>
                <ol className="mt-3">
                  {day.steps.map(([when, what]) => (
                    <li
                      key={when}
                      className="grid grid-cols-[5.5rem_1fr] gap-x-3 border-b border-border py-3 text-[15px] leading-6"
                    >
                      <span className="font-semibold">{when}</span>
                      <span>{what}</span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </section>

        <CanmoreGuide />

        <section id="faq" className={`${wrap} grid gap-x-14 gap-y-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:py-20`}>
          <div>
            <p className={eyebrow}>Questions</p>
            <h2 className={`${title} mt-3`}>What groups ask before they book</h2>
            <div className="mt-8 rounded-sm border border-border bg-card p-5">
              <p className="text-[15px] font-semibold">Your host</p>
              <p className="display mt-1 text-2xl font-medium">Canmore Creekside Lodge</p>
              <ul className={`${small} mt-3 flex flex-col gap-1`}>
                <li>Superhost, three years hosting</li>
                <li>Replies within an hour</li>
                <li>English and Chinese</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group border-b border-border">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-medium transition-colors duration-150 ease-out hover:text-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-[62ch] pb-5 text-[15px] leading-7 text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground [--focus-color:var(--primary-foreground)] lg:py-20">
          <div className={`${wrap} flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between`}>
            <div>
              <h2 className={title}>Ready to put dates on it?</h2>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-7 text-primary-foreground/85">
                Get the total and the split in under a minute, then send it to the group.
              </p>
            </div>
            <a
              href="#plan"
              className={`inline-flex h-12 shrink-0 items-center justify-center rounded-sm bg-primary-foreground px-6 text-[15px] font-semibold text-primary hover:bg-accent active:scale-[0.96] ${press}`}
            >
              Plan your stay
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-foreground py-12 text-background [--focus-color:var(--background)]">
        <div className={`${wrap} grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]`}>
          <div>
            <p className="display text-2xl font-medium">Creekside Lodge</p>
            <p className="mt-2 max-w-[36ch] text-sm leading-6 text-background/75">
              An entire lodge for up to sixteen, one block from Main Street in {lodge.place}.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Explore</p>
            <ul className="mt-2 flex flex-col text-sm">
              {sections.map(([href, text]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-block py-2 text-background/75 transition-colors duration-150 ease-out hover:text-background"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Details</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-background/75">
              <li>Licences {lodge.licences.join(", ")}</li>
              <li>Address sent after booking</li>
              <li>Prototype for review</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TripTypes() {
  const [selected, setSelected] = useState(0);
  const trip = tripTypes[selected];

  return (
    <section id="trips" className="bg-muted py-14 lg:py-20">
      <div className={wrap}>
        <p className={eyebrow}>Trip types</p>
        <h2 className={`${title} mt-3`}>What are you getting everyone together for?</h2>
        <div role="group" aria-label="Type of trip" className="mt-7 flex flex-wrap gap-2">
          {tripTypes.map((type, index) => (
            <button
              key={type.name}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              className={`${chip} bg-card`}
            >
              {type.name}
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className="mt-6 grid overflow-hidden rounded-sm border border-border bg-card md:grid-cols-[1fr_1.2fr]"
        >
          <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[21rem]">
            <Image
              key={trip.photo.src}
              src={trip.photo.src}
              alt={trip.photo.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-9">
            <h3 className="text-[1.75rem] font-medium leading-tight">{trip.name}</h3>
            <p className="mt-1 text-[17px] text-muted-foreground">{trip.line}</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15px] leading-6">
              {trip.points.map((point) => (
                <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-x-2">
                  <Check aria-hidden="true" className="mt-1 size-4 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CanmoreGuide() {
  const [season, setSeason] = useState<"summer" | "winter">("summer");
  const drives = byCar.filter((place) => !place.season || place.season === season);

  const list = (places: Place[], Icon: LucideIcon) => (
    <ul className="border-t border-border">
      {places.map((place) => (
        <li
          key={place.name}
          className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-border py-3"
        >
          <div>
            <p className="text-[15px] font-semibold">{place.name}</p>
            <p className={small}>{place.what}</p>
          </div>
          <p className="flex items-center gap-2 text-[15px] font-medium tabular-nums">
            <Icon aria-hidden="true" className="size-4 text-primary" />
            {place.time}
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="canmore" className="bg-muted py-14 lg:py-20">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className={eyebrow}>Canmore</p>
            <h2 className={`${title} mt-3`}>What is close, and how close</h2>
          </div>
          <div role="group" aria-label="Season" className="flex gap-2">
            {(["summer", "winter"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={season === option}
                onClick={() => setSeason(option)}
                className={`${chip} bg-card capitalize`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="mb-3 text-xl font-medium">On foot</h3>
            {list(onFoot, Footprints)}
            <Image
              src={photos.aerialCreek.src}
              alt={photos.aerialCreek.alt}
              width={photos.aerialCreek.width}
              height={photos.aerialCreek.height}
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="mt-6 aspect-[16/10] w-full rounded-sm object-cover"
            />
          </div>
          <div aria-live="polite">
            <h3 className="mb-3 text-xl font-medium">By car in {season}</h3>
            {list(drives, Car)}
            <p className={`${small} mt-3`}>
              Drive times are approximate and assume clear roads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const stepButton = `inline-flex size-11 items-center justify-center rounded-sm border border-input bg-card enabled:hover:border-foreground enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground ${press}`;

function GuestStepper({ booking, label }: { booking: Booking; label: string }) {
  return (
    <div role="group" aria-label="Number of guests" className="flex items-center gap-3">
      <span className="text-[15px] font-medium">{label}</span>
      <button
        type="button"
        aria-label="One guest fewer"
        disabled={booking.guests <= 1}
        onClick={() => booking.setGuests(booking.guests - 1)}
        className={stepButton}
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <output className="min-w-[4.5rem] text-center text-[15px] font-semibold tabular-nums">
        {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
      </output>
      <button
        type="button"
        aria-label="One guest more"
        disabled={booking.guests >= booking.maxGuests}
        onClick={() => booking.setGuests(booking.guests + 1)}
        className={stepButton}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

const dateInput =
  "mt-1.5 h-12 w-full rounded-sm border border-input bg-card px-3 text-base [color-scheme:light] transition-colors duration-150 ease-out hover:border-foreground";

function CostCard({ booking }: { booking: Booking }) {
  const { quote, stage } = booking;
  const [copied, setCopied] = useState(false);
  const datesChosen = Boolean(booking.checkIn && booking.checkOut);
  const showProblem = !quote && (datesChosen || Boolean(booking.error));

  const copySummary = async () => {
    if (!quote) return;
    await navigator.clipboard.writeText(
      `${lodge.name}: ${formatDate(booking.checkIn)} to ${formatDate(booking.checkOut)}, ` +
        `${booking.guests} guests. ${money(quote.total)} total, about ${money(quote.perGuest)} each.`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-sm border border-border bg-card p-5 lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-medium">Dates and cost</h3>
        <span className="rounded-sm bg-accent px-2 py-0.5 text-[13px] font-medium text-accent-foreground">
          Sample rates
        </span>
      </div>

      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          booking.reserve();
        }}
        noValidate
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="planner-arrive" className="text-sm font-medium">
              Check in
            </label>
            <input
              id="planner-arrive"
              type="date"
              min={booking.minDate}
              value={booking.checkIn}
              onChange={(event) => booking.setCheckIn(event.target.value)}
              className={dateInput}
            />
          </div>
          <div>
            <label htmlFor="planner-depart" className="text-sm font-medium">
              Check out
            </label>
            <input
              id="planner-depart"
              type="date"
              min={booking.checkIn || booking.minDate}
              value={booking.checkOut}
              onChange={(event) => booking.setCheckOut(event.target.value)}
              className={dateInput}
            />
          </div>
        </div>

        <GuestStepper booking={booking} label="Guests" />

        <div aria-live="polite" className="border-t border-border pt-4">
          <dl className="flex flex-col gap-2 text-[15px] tabular-nums">
            <div className="flex justify-between gap-4">
              <dt>
                {money(pricing.nightly)} × {quote ? `${quote.nights} nights` : "nights"}
              </dt>
              <dd>{quote ? money(quote.subtotal) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Cleaning</dt>
              <dd>{money(pricing.cleaning)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-2 font-semibold">
              <dt>Total before taxes</dt>
              <dd>{quote ? money(quote.total) : "—"}</dd>
            </div>
          </dl>
          <p
            className={`mt-4 flex items-baseline justify-between gap-4 rounded-sm px-3 py-3 ${
              quote ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <span className="text-[15px]">Split {booking.guests} ways</span>
            <span className="display text-2xl font-medium tabular-nums">
              {quote ? money(quote.perGuest) : "—"} <span className="text-[15px]">each</span>
            </span>
          </p>
          <p
            role={showProblem ? "alert" : undefined}
            className={`mt-3 flex min-h-12 items-start gap-2 text-sm leading-6 ${
              showProblem ? "font-medium text-destructive" : "text-muted-foreground"
            }`}
          >
            {showProblem && <CircleAlert aria-hidden="true" className="mt-1 size-4 shrink-0" />}
            {showProblem
              ? booking.problem
              : quote
                ? "Taxes are added at checkout."
                : "Add dates to see the total and what each person owes."}
          </p>
        </div>

        {stage === "requested" ? (
          <p className="border-l-2 border-primary pl-3 text-[15px] leading-6">
            Prototype stops here. In production this step opens the Hostaway checkout with these
            dates and {booking.guests} guests.
          </p>
        ) : (
          <button type="submit" className={`${primaryButton} w-full`}>
            Reserve
          </button>
        )}

        <button
          type="button"
          onClick={copySummary}
          disabled={!quote}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-input text-[15px] font-medium enabled:hover:border-foreground enabled:active:scale-[0.96] disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground ${press}`}
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="size-4" /> Copied
            </>
          ) : (
            "Copy the split for the group chat"
          )}
        </button>
      </form>
    </div>
  );
}

function BedPlanCard({ booking }: { booking: Booking }) {
  const plan = bedPlan(booking.guests);

  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <h3 className="text-xl font-medium">Who sleeps where</h3>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-sm bg-muted px-4 py-3">
        <GuestStepper booking={booking} label="Planning for" />
        <p aria-live="polite" className="text-[15px] leading-6">
          {plan.onSofaBeds === 0 ? (
            <>
              <strong className="font-semibold">Everyone gets a real bed.</strong> No sofa beds
              needed.
            </>
          ) : (
            <>
              <strong className="font-semibold">
                {plan.inBeds} in beds, {plan.onSofaBeds} on{" "}
                {plan.onSofaBeds === 1 ? "a sofa bed" : "sofa beds"}.
              </strong>{" "}
              {plan.sofaRoomsInUse.length === 1 ? "Sofa bed" : "Sofa beds"} in use:{" "}
              {plan.sofaRoomsInUse.join(", ")}.
            </>
          )}
        </p>
      </div>

      <ul className="mt-2">
        {rooms.map((room) => {
          const sofaInUse = plan.sofaRoomsInUse.includes(room.name);
          return (
            <li
              key={room.name}
              className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 border-b border-border py-3 last:border-b-0"
            >
              {room.photo ? (
                <Image
                  src={room.photo.src}
                  alt=""
                  width={room.photo.width}
                  height={room.photo.height}
                  sizes="72px"
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                />
              ) : (
                <span aria-hidden="true" className="aspect-[4/3] w-full rounded-sm bg-muted" />
              )}
              <div className="min-w-0">
                <p className="text-[15px] font-semibold">{room.name}</p>
                <p className="text-[15px] leading-6">{room.beds}</p>
                <p className={`${small} hidden sm:block`}>{room.note}</p>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-semibold tabular-nums">
                  Sleeps {room.inBeds + room.onSofaBeds}
                </p>
                {room.onSofaBeds > 0 && (
                  <p
                    className={`mt-1 inline-block rounded-sm px-2 py-0.5 text-[13px] ${
                      sofaInUse
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {sofaInUse ? "Sofa bed in use" : "Sofa bed free"}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className={`${small} mt-3 border-t border-border pt-3`}>
        {realBedCapacity} guests fit in beds across the five bedrooms. Four sofa beds take the
        lodge to {lodge.guests}, counted at two guests each.
      </p>
    </div>
  );
}
