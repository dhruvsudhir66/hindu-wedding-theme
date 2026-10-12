import { template4Defaults } from "../../templates/template4/defaults";
import { template4Schema, type Template4Config } from "../../templates/template4/schema";

const weddingInput = {
  template: "template4",
  slug: "saanjh-and-arya",
  seo: {
    title: "Saanjh & Arya | Wedding Invitation",
    description: "Join Saanjh and Arya as they begin their next chapter together.",
  },
  couple: {
    partnerOne: "Saanjh",
    partnerTwo: "Arya",
    separator: "&",
  },
  saveTheDate: {
    eyebrow: "Together with our families",
    title: "Save the date",
    dateLabel: "Sunday, 22 November 2026",
    dateIso: "2026-11-22T15:00:00+05:30",
    timeLabel: "At three in the afternoon",
    venueLabel: "Kerala, India",
    openLabel: "Open your invitation",
    note: "With love, blessings and joy, we invite you to celebrate our beginning.",
  },
  theme: {
    maroon: "#501B2B",
    vermilion: "#C85D48",
    turmeric: "#D9AE52",
    sage: "#9AA58A",
    cream: "#FFF8EF",
    antiqueGold: "#B99A65",
    ink: "#3D2930",
  },
  motion: {
    ...template4Defaults.motion,
    transitionDurationMs: 900,
    enableAmbientMotion: true,
  },
  venue: {
    wedding: {
      name: "Wedding Ceremony Venue",
      address: "Venue address, city",
      date: "Sunday, 22 November 2026",
      time: "3:00 PM",
      mapUrl: "https://maps.google.com/?q=Wedding+Venue",
    },
    reception: {
      name: "Reception Venue",
      address: "Reception address, city",
      date: "Sunday, 22 November 2026",
      time: "6:00 PM",
      mapUrl: "https://maps.google.com/?q=Reception+Venue",
    },
  },
} satisfies Template4Config;

export const saanjhAndArya: Template4Config = template4Schema.parse(weddingInput);
