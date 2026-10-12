"use client";

import styles from "../styles/template4.module.css";

type FooterProps = {
  coupleNames: string;
  weddingDate: string;
};

export default function Footer({
  coupleNames,
  weddingDate,
}: FooterProps) {
  return (
    <footer className={styles.weddingFooter}>
      <div className={styles.weddingFooterInner}>
        <div className={styles.weddingFooterOrnament} aria-hidden="true">
          <span />
          <span className={styles.weddingFooterFlower}>✳</span>
          <span />
        </div>

        <p className={styles.weddingFooterEyebrow}>
          WITH LOVE AND BLESSINGS
        </p>

        <p className={styles.weddingFooterNames}>{coupleNames}</p>

        <p className={styles.weddingFooterMessage}>
          A new chapter, a lifetime of love.
        </p>

        <div className={styles.weddingFooterDate}>
          <span aria-hidden="true">✧</span>
          <span>{weddingDate}</span>
          <span aria-hidden="true">✧</span>
        </div>

        <div className={styles.weddingFooterBottom}>
          <span className={styles.weddingFooterCopyright}>
            Made with love, for our favourite people.
          </span>

          <a className={styles.weddingFooterTopLink} href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}