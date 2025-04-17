import H1 from "@/components/h1";
import { BASE_API_URL } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const response = await fetch(`${BASE_API_URL}/${slug}`);
  const event = await response.json();
  return {
    title: event.name,
  };
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;
  const response = await fetch(`${BASE_API_URL}/${slug}`);
  const event = await response.json();

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center  py-14 lg:py-20">
        <Image
          src={event.imageUrl}
          className="object-cover blur-3xl z-0"
          alt="event background image"
          fill
          quality={50}
          sizes="(max-width: 1280) 100vw, 1280px"
        />

        <div className="z-1 flex flex-col lg:flex-row gap-6 lg:gap-16 relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            priority
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "2-digit",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="mt-5 lg:mt-auto bg-white/20 text-lg capitalize bg-blur w-full rounded-md border-white/10 border-2 py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}
function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
