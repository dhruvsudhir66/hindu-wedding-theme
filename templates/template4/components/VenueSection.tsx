"use client";

import { useId } from "react";
import styles from "../styles/template4.module.css";

export type VenueEvent = {
  name: string;
  date: string;
  time: string;
  mapUrl: string;
  address?: string;
};

type VenueSectionProps = {
  wedding: VenueEvent;
  reception: VenueEvent;
};

type VenueItemProps = {
  event: VenueEvent;
  label: string;
};

function VenueItem({ event, label }: VenueItemProps) {
  const id = useId();

  return (
    <article className={styles.venueItem} aria-labelledby={`${id}-name`}>
      <p className={styles.venueItemLabel}>{label}</p>

      <h3 id={`${id}-name`} className={styles.venueName}>
        {event.name}
      </h3>

      {event.address && (
        <p className={styles.venueAddress}>{event.address}</p>
      )}

      <dl className={styles.venueDetails}>
        <div className={styles.venueDetail}>
          <dt className={styles.venueDetailLabel}>DATE</dt>
          <dd className={styles.venueDetailValue}>{event.date}</dd>
        </div>

        <div className={styles.venueDetail}>
          <dt className={styles.venueDetailLabel}>TIME</dt>
          <dd className={styles.venueDetailValue}>{event.time}</dd>
        </div>
      </dl>

      <a
        className={styles.venueMapLink}
        href={event.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${event.name}`}
      >
        Get directions
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export default function VenueSection({
  wedding,
  reception,
}: VenueSectionProps) {
  const id = useId();

  return (
    <section
      className={styles.venueSection}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.venueInner}>
        <header className={styles.venueHeader}>
          <p className={styles.venueEyebrow}>THE CELEBRATIONS</p>

          <h2 id={`${id}-title`} className={styles.venueTitle}>
            Find us <span>here</span>
          </h2>

          <p className={styles.venueIntroduction}>
            We would love to share these special moments with you.
          </p>
        </header>

        <div className={styles.venueList}>
          <VenueItem event={wedding} label="01 / THE WEDDING" />
          <VenueItem event={reception} label="02 / THE RECEPTION" />
        </div>

        <p className={styles.venueClosing}>
          Looking forward to celebrating with you.
        </p>
      </div>
    </section>
  );
}