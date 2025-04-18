import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { RESULTS_PER_PAGE } from "./consts";
import prisma from "./db";
import { capitalize } from "./utils";

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
