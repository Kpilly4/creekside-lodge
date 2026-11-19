import { Fraunces, Hanken_Grotesk, Italiana, Open_Sans } from "next/font/google";

// Atelier: a thin classical display face over a plain humanist sans.
export const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
  display: "swap",
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Planner: a soft, sturdy serif for headings over a plain grotesque for data.
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const protoFontVariables = [italiana, openSans, fraunces, hanken]
  .map((font) => font.variable)
  .join(" ");
