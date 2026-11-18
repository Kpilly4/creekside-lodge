import type { Metadata } from "next";
import { protoFontVariables } from "./fonts";
import { Harness } from "./Harness";
import "./proto.css";

export const metadata: Metadata = {
  title: "Prototype: listing page",
  robots: { index: false, follow: false },
};

export default async function ListingPrototypePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const initial = Math.min(3, Math.max(1, Number.parseInt(v ?? "1", 10) || 1)) - 1;

  return (
    <div className={protoFontVariables}>
      <Harness initial={initial} />
    </div>
  );
}
