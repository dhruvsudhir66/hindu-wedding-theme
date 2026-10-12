import type { Template4Config } from "./schema";

/**
 * Shared template4 baseline. Couple and save-the-date fields belong in each
 * wedding config (see configs/weddings/*) — they are required by the schema.
 */
export type Template4Defaults = Pick<Template4Config, "theme" | "motion">;

export const template4Defaults: Template4Defaults = {
  theme: {
    maroon: "#4B101F",
    vermilion: "#D93819",
    turmeric: "#F7B91B",
    sage: "#96B58A",
    cream: "#FFF5E4",
    antiqueGold: "#D6B779",
    ink: "#431522",
  },

  motion: {
    transitionDurationMs: 900,
    enableAmbientMotion: true,
  },
};
