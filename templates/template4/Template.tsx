"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Template4Config } from "./schema";
import { SaveTheDate } from "./components/SaveTheDate";
import { WeddingContent } from "./components/WeddingContent";
import styles from "./styles/template4.module.css";

type TemplateProps = {
  wedding: Template4Config;
};

export default function Template4({ wedding }: TemplateProps) {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const themeStyle = useMemo(
    () =>
      ({
        "--w4-maroon": wedding.theme.maroon,
        "--w4-vermilion": wedding.theme.vermilion,
        "--w4-turmeric": wedding.theme.turmeric,
        "--w4-sage": wedding.theme.sage,
        "--w4-cream": wedding.theme.cream,
        "--w4-gold": wedding.theme.antiqueGold,
        "--w4-ink": wedding.theme.ink,
        "--w4-transition": `${wedding.motion.transitionDurationMs}ms`,
      }) as CSSProperties,
    [wedding.theme, wedding.motion.transitionDurationMs],
  );

  return (
    <main className={styles.experience} style={themeStyle}>
      <div
        className={`${styles.stage} ${isInvitationOpen ? styles.stageOpened : ""}`}
        data-open={isInvitationOpen}
      >
        <div
          className={styles.saveDateLayer}
          aria-hidden={isInvitationOpen}
          inert={isInvitationOpen}
        >
          <SaveTheDate
            wedding={wedding}
            onOpen={() => setIsInvitationOpen(true)}
          />
        </div>

        <section
          className={styles.weddingLayer}
          aria-label="Wedding invitation details"
          aria-hidden={!isInvitationOpen}
          inert={!isInvitationOpen}
        >
          {isInvitationOpen && <WeddingContent wedding={wedding} />}
        </section>
      </div>
    </main>
  );
}
