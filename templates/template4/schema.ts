import { z } from "zod";

const hexColor = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Expected a valid hex colour.");

export const template4Schema = z.object({
  template: z.literal("template4"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug."),
  seo: z.object({
    title: z.string().min(1).max(70),
    description: z.string().min(1).max(180),
  }),
  couple: z.object({
    partnerOne: z.string().min(1).max(60),
    partnerTwo: z.string().min(1).max(60),
    separator: z.string().max(8).default("&"),
  }),
  saveTheDate: z.object({
    eyebrow: z.string().min(1).max(80),
    title: z.string().min(1).max(100),
    dateLabel: z.string().min(1).max(80),
    dateIso: z.string().datetime({ offset: true }),
    timeLabel: z.string().max(80).optional(),
    venueLabel: z.string().max(120).optional(),
    openLabel: z.string().min(1).max(40).default("Open invitation"),
    note: z.string().max(180).optional(),
    backgroundImage: z.string().optional(),
  }),
  theme: z.object({
    maroon: hexColor.default("#4B101F"),
    vermilion: hexColor.default("#D93819"),
    turmeric: hexColor.default("#F7B91B"),
    sage: hexColor.default("#96B58A"),
    cream: hexColor.default("#FFF5E4"),
    antiqueGold: hexColor.default("#D6B779"),
    ink: hexColor.default("#431522"),
  }),
  motion: z.object({
    transitionDurationMs: z.number().int().min(300).max(1800).default(900),
    enableAmbientMotion: z.boolean().default(true),
  }).default({ transitionDurationMs: 900, enableAmbientMotion: true }),
  venue: z.object({
    wedding: z.object({
      name: z.string().min(1).max(120),
      address: z.string().min(1).max(180),
      date: z.string().min(1).max(80),
      time: z.string().max(80).optional(),
      mapUrl: z.string().url().optional(),
    }),
    reception: z.object({
      name: z.string().min(1).max(120),
      address: z.string().min(1).max(180),
      date: z.string().min(1).max(80),
      time: z.string().max(80).optional(),
      mapUrl: z.string().url().optional(),
    }),
  }),
});

export type Template4Config = z.infer<typeof template4Schema>;
