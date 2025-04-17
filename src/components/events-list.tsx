import { EventoEvent } from "@/lib/types";
import React from "react";
import EventCard from "./event-card";
import { BASE_API_URL } from "@/lib/constants";

type EventsListProps = {
  city: string;
};

export default async function EventsList({ city }: EventsListProps) {
  const response = await fetch(`${BASE_API_URL}?city=${city}`, {
    next: {
      revalidate: 300,
    },
  });
  const events: EventoEvent[] = await response.json();
  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
