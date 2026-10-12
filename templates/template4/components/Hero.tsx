"use client";

import { useEffect, useRef } from "react";
import styles from "../styles/template4.module.css";

type HeroProps = {
  videoSrc?: string;
  posterSrc?: string;
  coupleNames?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  weddingDate?: string;
  venue?: string;
};

export default function Hero({
  videoSrc = "/videos/hindu-wedding-hero.mp4",
  posterSrc = "/images/hindu-wedding-poster.jpg",
  coupleNames = "Aarav & Ananya",
  eyebrow = "A celebration of love",
  title = "Two Souls, One Beautiful Journey",
  description = "With hearts full of love and families woven together by tradition, a beautiful new chapter begins. Join us as we celebrate a union blessed by love, laughter, and the timeless beauty of Indian wedding traditions.",
  weddingDate,
  venue,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlayback = () => {
      video.play().catch(() => {
        // The poster and hero content remain visible if playback is blocked.
      });
    };

    attemptPlayback();
  }, []);

  return (
    <section className={styles.hero} aria-label="Wedding celebration">
      <div className={styles.heroMedia} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          tabIndex={-1}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>
          <span className={styles.heroOrnament} aria-hidden="true">
            ✦
          </span>
          {eyebrow}
          <span className={styles.heroOrnament} aria-hidden="true">
            ✦
          </span>
        </span>

        <h1 className={styles.heroTitle}>{title}</h1>

        <div className={styles.heroDivider} aria-hidden="true">
          <span />
          <span className={styles.heroDividerDiamond}>◆</span>
          <span />
        </div>

        <p className={styles.heroDescription}>{description}</p>

        <p className={styles.heroCoupleNames}>{coupleNames}</p>

        {(weddingDate || venue) && (
          <div className={styles.heroDetails}>
            {weddingDate && (
              <span className={styles.heroDetail}>{weddingDate}</span>
            )}
            {weddingDate && venue && (
              <span className={styles.heroDetailDot} aria-hidden="true">
                ·
              </span>
            )}
            {venue && <span className={styles.heroDetail}>{venue}</span>}
          </div>
        )}
      </div>

      <a
        className={styles.heroScroll}
        href="#main-content"
        aria-label="Scroll to wedding details"
      >
        <span className={styles.heroScrollText}>Discover our celebration</span>
        <span className={styles.heroScrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}