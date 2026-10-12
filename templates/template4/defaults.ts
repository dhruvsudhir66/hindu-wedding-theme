import type { Template4Config } from "./schema";

export const template4Defaults = {
  couple: { separator: "&" },
  saveTheDate: { openLabel: "Open invitation" },
  theme: {
    maroon: "#4B101F",
    vermilion: "#D93819",
    turmeric: "#F7B91B",
    sage: "#96B58A",
    cream: "#FFF5E4",
    antiqueGold: "#D6B779",
    ink: "#431522",
  },
  motion: { transitionDurationMs: 900, enableAmbientMotion: true },
} satisfies Partial<Template4Config>;
