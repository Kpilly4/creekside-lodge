import Image from "next/image";

export function ListingBrand() {
  return (
    <span className="inline-flex items-center gap-3 text-left">
      <Image
        src="/images/creekside-mark.png"
        alt=""
        width={1637}
        height={960}
        sizes="(min-width: 768px) 112px, 64px"
        className="no-outline h-auto w-16 shrink-0 md:w-28"
      />
      <span>
        <span className="display block text-[clamp(1.375rem,6.4vw,1.75rem)] font-normal uppercase leading-none tracking-[0.08em] md:text-[2rem]">
          Creekside
        </span>
        <span className="mt-1.5 block whitespace-nowrap font-[family-name:var(--text-font)] text-[9px] font-normal uppercase leading-none tracking-[0.24em] md:text-[10px]">
          Canmore · Alberta
        </span>
      </span>
    </span>
  );
}
