import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_API_URL } from "./constants";
import { EventoEvent } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getEvent(slug: string): Promise<EventoEvent> {
  const response = await fetch(`${BASE_API_URL}/${slug}`);
  return await response.json();
}

export async function getEvents(city: string): Promise<EventoEvent[]> {
  const response = await fetch(`${BASE_API_URL}?city=${city}`, {
    next: {
      revalidate: 300,
    },
  });
  return await response.json();
}
