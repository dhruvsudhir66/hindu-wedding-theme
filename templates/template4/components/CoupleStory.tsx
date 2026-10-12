"use client";

import { useId } from "react";
import styles from "../styles/template4.module.css";

type ParentCoupleProfile = {
  name: string;
  role: string;
  image: string;
};

type CoupleProfile = {
  name: string;
  description: string;
  image: string;
  parents: ParentCoupleProfile;
};

type CoupleStoryProps = {
  bride: CoupleProfile;
  groom: CoupleProfile;
  coupleImage: string;
  eyebrow?: string;
  title?: string;
  introduction?: string;
  closingLine?: string;
};

function ParentCouplePortrait({
  parents,
}: {
  parents: ParentCoupleProfile;
}) {
  return (
    <div className={styles.familyPortrait}>
      <div className={styles.familyPortraitFrame}>
        <img
          src={parents.image}
          alt={`${parents.name}, ${parents.role}`}
          className={styles.familyPortraitImage}
          loading="lazy"
        />
      </div>

      <p className={styles.familyPortraitName}>{parents.name}</p>
      <p className={styles.familyPortraitRole}>{parents.role}</p>
    </div>
  );
}

function FamilySide({
  person,
  side,
}: {
  person: CoupleProfile;
  side: "bride" | "groom";
}) {
  const isBride = side === "bride";

  return (
    <div
      className={`${styles.coupleFamilySide} ${
        isBride ? styles.coupleBrideSide : styles.coupleGroomSide
      }`}
    >
      <div className={styles.coupleIdentity}>
        <span className={styles.coupleFlourish} aria-hidden="true">
          ❧
        </span>

        <p className={styles.coupleRole}>
          {isBride ? "The Bride" : "The Groom"}
        </p>

        <h3 className={styles.couplePersonName}>{person.name}</h3>

        <p className={styles.coupleDescription}>{person.description}</p>

        <div className={styles.coupleSmallDivider} aria-hidden="true">
          <span />
          <span>✦</span>
          <span />
        </div>
      </div>

      <div className={styles.familyGroup}>

        <ParentCouplePortrait parents={person.parents} />
      </div>
    </div>
  );
}

export default function CoupleStory({
  bride,
  groom,
  coupleImage,
  eyebrow = "OUR FAMILIES",
  title = "Two Hearts, Two Families",
  introduction = "With the blessings and love of our families, we begin a new chapter together.",
  closingLine = "Different roots, one beautiful journey.",
}: CoupleStoryProps) {
  const id = useId();

  return (
    <section
      className={styles.coupleStorySection}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.coupleStoryInner}>
        <header className={styles.coupleStoryHeader}>
          <div className={styles.coupleStoryOrnament} aria-hidden="true">
            <span />
            <span>✧</span>
            <span />
          </div>

          <p className={styles.coupleStoryEyebrow}>{eyebrow}</p>

          <h2
            id={`${id}-title`}
            className={styles.coupleStoryTitle}
          >
            {title}
          </h2>

          <p className={styles.coupleStoryIntroduction}>
            {introduction}
          </p>
        </header>

        <div className={styles.coupleStoryComposition}>
          <FamilySide person={groom} side="groom" />

          <div className={styles.couplePortraitColumn}>
            <div className={styles.couplePortraitFrame}>
              <div className={styles.couplePortraitInner}>
                <img
                  src={coupleImage}
                  alt={`${groom.name} and ${bride.name}`}
                  className={styles.couplePortraitImage}
                  loading="lazy"
                />
              </div>

              <span
                className={`${styles.couplePortraitCorner} ${styles.couplePortraitCornerTop}`}
                aria-hidden="true"
              />

              <span
                className={`${styles.couplePortraitCorner} ${styles.couplePortraitCornerBottom}`}
                aria-hidden="true"
              />
            </div>

            <p className={styles.couplePortraitCaption}>
              Together, our favourite place to be
            </p>
          </div>

          <FamilySide person={bride} side="bride" />
        </div>

        <footer className={styles.coupleStoryFooter}>
          <span className={styles.coupleStoryRing} aria-hidden="true">
            ◯
          </span>

          <p>{closingLine}</p>
        </footer>
      </div>
    </section>
  );
}