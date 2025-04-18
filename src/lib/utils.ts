import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { notFound } from "next/navigation";
import { RESULTS_PER_PAGE } from "./consts";
import { unstable_cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
});

export const getEvents = unstable_cache(
  async (city: string, page: number = 1) => {
    const events = await prisma.eventoEvent.findMany({
      where: {
        city: city === "all" ? undefined : capitalize(city),
      },
      orderBy: {
        date: "asc",
      },
      take: RESULTS_PER_PAGE,
      skip: (page - 1) * RESULTS_PER_PAGE,
    });

    let numEvents;

    if (city === "all") {
      numEvents = await prisma.eventoEvent.count();
    } else {
      numEvents = await prisma.eventoEvent.count({
        where: {
          city: capitalize(city),
        },
      });
    }

    return { events, numEvents };
  }
);
