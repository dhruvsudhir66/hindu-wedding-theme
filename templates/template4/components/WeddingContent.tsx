import { Cormorant_Garamond, Cinzel, Allura } from "next/font/google";
import type { CSSProperties } from "react";
import type { Template4Config } from "../schema";
import Hero from "./Hero";
import WeddingMusic from "./WeddingMusic";
import CountdownCalendar from "./CountdownCalendar";
import CoupleStory from "./CoupleStory";
import OurStory from "./OurStory";
import RSVP, { type RSVPResponse } from "./RSVP";
import VenueSection from "./VenueSection";
import Footer from "./Footer";


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type Props = {
  wedding: Template4Config;
};

export function WeddingContent({ wedding }: Props) {
  return (
    <main
      className=""
      style={
        {
          "--font-cormorant": cormorant.style.fontFamily,
          "--font-cinzel": cinzel.style.fontFamily,
          "--font-allura": allura.style.fontFamily,
        } as CSSProperties
      }
    >
      <Hero
  videoSrc="/weddings/template4/videos/hindu-wedding-hero.mp4"
  coupleNames={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`}
/>
<WeddingMusic />
<CountdownCalendar
  weddingDate="2026-11-15T15:00:00+05:30"
  coupleNames={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`}
  venue="Kerala, India"
/>
<CoupleStory
  eyebrow="OUR FAMILIES"
  title="Two Hearts, Two Families"
  introduction="With the blessings and love of our families, we begin a new chapter together."
  closingLine="Different roots, one beautiful journey."
  coupleImage="/weddings/template4/images/couple-together.jpg"
  groom={{
    name: "Saanjh",
    description:
      "A kind heart, a curious mind, and a love for life's simple moments.",
    image: "/weddings/template4/images/groom.jpg",
    parents: {
      name: "Sanjay & Jhansi",
      role: "Groom's parents",
      image: "/weddings/template4/images/groom-parents.png",
    },
  }}
  bride={{
    name: "Arya",
    description:
      "A warm spirit, a thoughtful soul, and a heart full of dreams.",
    image: "/weddings/template4/images/bride.jpg",
    parents: {
      name: "Anand & Ananya",
      role: "Bride's parents",
      image: "/weddings/template4/images/bride-parents.png",
    },
  }}
/>

<OurStory
  coupleNames={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`}
  coupleImage="/weddings/template4/images/couple-together.jpg"
  introduction="What began as two separate journeys slowly became a story of friendship, understanding, and a love that feels like home."
  firstMeetingDate="21 January 2024"
  firstMeetingDescription="A simple meeting that became the beginning of something beautiful."
  engagementDate="20 August 2025"
  engagementDescription="A promise to choose each other, today and always."
  weddingDate="15 November 2026"
  weddingDescription="The day we begin our forever, surrounded by the people we love."
/>
<VenueSection
  wedding={{
    name: wedding.venue.wedding.name,
    address: wedding.venue.wedding.address,
    date: wedding.venue.wedding.date,
    time: wedding.venue.wedding.time || "",
    mapUrl: wedding.venue.wedding.mapUrl || "",
  }}
  reception={{
    name: wedding.venue.reception.name,
    address: wedding.venue.reception.address,
    date: wedding.venue.reception.date,
    time: wedding.venue.reception.time || "",
    mapUrl: wedding.venue.reception.mapUrl || "",
  }}
/>
<RSVP
  coupleNames={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`}
  weddingDate="15 November 2026"
  venue="Kerala, India"
  onSubmit={() => Promise.resolve()}
/>
<Footer
  coupleNames={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo}`}
  weddingDate={wedding.saveTheDate.dateLabel}
/>
    </main>
  );
}