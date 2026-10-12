
"use client";

import Image from "next/image";
import { Allura, Cinzel, Playfair_Display } from "next/font/google";

import type { Template4Config } from "../schema";
import styles from "../styles/template4.module.css";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type Props = {
  wedding: Template4Config;
  onOpen: () => void;
};

const petals = [
  "petalOne",
  "petalTwo",
  "petalThree",
  "petalFour",
  "petalFive",
  "petalSix",
] as const;

function Mandala({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none">
        {[53, 39, 24].map((radius) => (
          <circle
            key={radius}
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth=".8"
            opacity=".6"
          />
        ))}

        {Array.from({ length: 12 }, (_, i) => i * 30).map((angle) => (
          <g key={angle} transform={`rotate(${angle} 60 60)`}>
            <path
              d="M60 7 C69 24 70 39 60 60 C50 39 51 24 60 7Z"
              stroke="currentColor"
              strokeWidth=".8"
            />
            <circle cx="60" cy="13" r="1.8" fill="currentColor" />
          </g>
        ))}

        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

function LotusDivider() {
  return (
    <div className={styles.lotusDivider} aria-hidden="true">
      <span />
      <svg viewBox="0 0 52 24" fill="none">
        <path d="M26 21C18 14 18 8 26 3C34 8 34 14 26 21Z" />
        <path d="M24 20C15 20 10 15 10 10C18 10 23 14 24 20Z" />
        <path d="M28 20C37 20 42 15 42 10C34 10 29 14 28 20Z" />
      </svg>
      <span />
    </div>
  );
}

export function SaveTheDate({ wedding, onOpen }: Props) {
  const ambientMotion = wedding.motion.enableAmbientMotion;

  return (
    <section
      className={`${styles.saveDate} ${
        ambientMotion ? styles.saveDateAmbient : ""
      }`}
      aria-labelledby="w4-save-date-title"
    >
      <div className={styles.backdropPattern} aria-hidden="true" />
      <div className={styles.lightRays} aria-hidden="true" />

      <div className={styles.petalField} aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal}
            className={`${styles.petal} ${styles[petal]}`}
          />
        ))}
      </div>

      <div className={styles.outerFrame} aria-hidden="true">
        <span className={styles.frameCornerTopLeft} />
        <span className={styles.frameCornerTopRight} />
        <span className={styles.frameCornerBottomLeft} />
        <span className={styles.frameCornerBottomRight} />
        <span className={styles.frameJewelTop} />
        <span className={styles.frameJewelBottom} />
      </div>

      <div className={styles.pageOrnament} aria-hidden="true">
        <Mandala className={styles.sideMandalaLeft} />
        <Mandala className={styles.sideMandalaRight} />
      </div>

      <div className={styles.invitationCard}>
        <div className={styles.cardInnerFrame} aria-hidden="true" />
        <Mandala className={styles.cardWatermark} />

        <header className={styles.cardHeader}>
          <div className={styles.headerEmblem}>
            <Mandala className={styles.headerMandala} />
          </div>

          <p className={`${styles.kicker} ${cinzel.className}`}>
            {wedding.saveTheDate.title}
          </p>

          <p className={`${styles.headerSubline} ${playfair.className}`}>
            A celebration of love, family &amp; tradition
          </p>

          <LotusDivider />
        </header>

        <div className={styles.coupleArtwork}>
          <div className={styles.artworkArch} aria-hidden="true">
            <span />
            <span />
          </div>

          <div className={styles.artworkHalo} aria-hidden="true" />

          <Image
            className={styles.coupleImage}
            src="/weddings/template4/images/indian-wedding-couple.png"
            alt="Illustration of an Indian wedding couple in traditional ivory and rose-pink attire"
            width={1086}
            height={1448}
            priority
            sizes="(max-width: 520px) 90vw, (max-width: 900px) 60vw, 440px"
          />

          <div className={styles.artworkFoot} aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
        </div>

        <div className={styles.detailsPanel}>
          <h1
            id="w4-save-date-title"
            className={`${styles.coupleNames} ${allura.className}`}
          >
            <span>{wedding.couple.partnerOne}</span>
            <span className={styles.namesSeparator}>
              {wedding.couple.separator}
            </span>
            <span>{wedding.couple.partnerTwo}</span>
          </h1>

          <LotusDivider />

          <p className={`${styles.dateLabel} ${playfair.className}`}>
            {wedding.saveTheDate.dateLabel}
          </p>
        </div>

        <button
          className={`${styles.openButton} ${cinzel.className}`}
          type="button"
          onClick={onOpen}
          aria-label={`${wedding.saveTheDate.openLabel} for ${wedding.couple.partnerOne} and ${wedding.couple.partnerTwo}`}
        >
          <span>{wedding.saveTheDate.openLabel}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15M13 5l7 7-7 7" />
          </svg>
        </button>

        <p className={`${styles.cardFooter} ${cinzel.className}`}>
          With the blessings of our families
        </p>
      </div>

      <p className={`${styles.outerCaption} ${cinzel.className}`}>
        Made with love · A new beginning
      </p>
    </section>
  );
}
