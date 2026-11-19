 "use client";

import { useState } from "react";
import { lodge, pricing } from "./data";

// Stands in for the Hostaway availability and quote calls. Every variant shares
// this state so only the presentation differs.

const DAY = 86_400_000;

export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export type Quote = {
  nights: number;
  subtotal: number;
  cleaning: number;
  total: number;
  perGuest: number;
};

export function useBooking(initialGuests = 12) {
  const [checkIn, setCheckInValue] = useState("");
  const [checkOut, setCheckOutValue] = useState("");
  const [guests, setGuestsValue] = useState(initialGuests);
  const [stage, setStage] = useState<"editing" | "quoted" | "requested">("editing");
  const [showError, setShowError] = useState(false);

  const nights =
    checkIn && checkOut ? Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / DAY) : 0;

  let problem: string | null = null;
  if (!checkIn || !checkOut) problem = "Choose an arrival and a departure date.";
  else if (nights <= 0) problem = "Departure must be after arrival.";
  else if (nights < pricing.minNights)
    problem = `The minimum stay is ${pricing.minNights} nights.`;

  const quote: Quote | null = problem
    ? null
    : (() => {
        const subtotal = nights * pricing.nightly;
        const total = subtotal + pricing.cleaning;
        return {
          nights,
          subtotal,
          cleaning: pricing.cleaning,
          total,
          perGuest: Math.ceil(total / guests),
        };
      })();

  const edit = () => {
    setStage("editing");
    setShowError(false);
  };

  return {
    checkIn,
    checkOut,
    guests,
    maxGuests: lodge.guests,
    minDate: todayISO(),
    stage,
    quote,
    error: showError ? problem : null,
    /** Why there is no quote yet, whether or not the guest has asked. */
    problem,
    setCheckIn: (value: string) => {
      setCheckInValue(value);
      edit();
    },
    setCheckOut: (value: string) => {
      setCheckOutValue(value);
      edit();
    },
    setGuests: (value: number) => {
      setGuestsValue(Math.min(lodge.guests, Math.max(1, value)));
      edit();
    },
    /** Returns true when the dates are valid and a quote is showing. */
    check: () => {
      if (problem) {
        setShowError(true);
        return false;
      }
      setShowError(false);
      setStage("quoted");
      return true;
    },
    reserve: () => {
      if (problem) {
        setShowError(true);
        return;
      }
      setStage("requested");
    },
  };
}

export type Booking = ReturnType<typeof useBooking>;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const guestOptions = Array.from({ length: lodge.guests }, (_, i) => i + 1);
