
"use client";

import { useId, useState } from "react";
import styles from "../styles/template4.module.css";

type StoryMilestone = {
  id: "meeting" | "engagement" | "wedding";
  label: string;
  date: string;
  description: string;
};

type OurStoryProps = {
  coupleNames: string;
  coupleImage: string;
  imageAlt?: string;
  introduction: string;
  firstMeetingDate: string;
  firstMeetingDescription: string;
  engagementDate: string;
  engagementDescription: string;
  weddingDate: string;
  weddingDescription?: string;
};

const milestoneSymbols: Record<StoryMilestone["id"], string> = {
  meeting: "✳",
  engagement: "❧",
  wedding: "✧",
};

const milestoneNumbers: Record<StoryMilestone["id"], string> = {
  meeting: "01",
  engagement: "02",
  wedding: "03",
};

export default function OurStory({
  coupleNames,
  coupleImage,
  imageAlt,
  introduction,
  firstMeetingDate,
  firstMeetingDescription,
  engagementDate,
  engagementDescription,
  weddingDate,
  weddingDescription = "And now, we begin our forever, surrounded by the people we love.",
}: OurStoryProps) {
  const [openMilestone, setOpenMilestone] = useState<
    StoryMilestone["id"] | null
  >(null);

  const accordionId = useId();

  const milestones: StoryMilestone[] = [
    {
      id: "meeting",
      label: "THE FIRST MEETING",
      date: firstMeetingDate,
      description: firstMeetingDescription,
    },
    {
      id: "engagement",
      label: "THE ENGAGEMENT",
      date: engagementDate,
      description: engagementDescription,
    },
    {
      id: "wedding",
      label: "THE WEDDING",
      date: weddingDate,
      description: weddingDescription,
    },
  ];

  const toggleMilestone = (id: StoryMilestone["id"]) => {
    setOpenMilestone((current) => (current === id ? null : id));
  };

  return (
    <section
      className={styles.ourStorySection}
      aria-labelledby={`${accordionId}-heading`}
    >
      <div className={styles.ourStoryLayout}>
        {/* Left: the couple's photograph */}
        <div className={styles.ourStoryVisual}>
          <div className={styles.ourStoryPhotoFrame}>
            <img
              src={coupleImage}
              alt={imageAlt ?? `${coupleNames} together`}
              className={styles.ourStoryPhoto}
              loading="lazy"
            />

            <span
              className={`${styles.ourStoryPhotoCorner} ${styles.ourStoryPhotoCornerTop}`}
              aria-hidden="true"
            />

            <span
              className={`${styles.ourStoryPhotoCorner} ${styles.ourStoryPhotoCornerBottom}`}
              aria-hidden="true"
            />
          </div>

          <div className={styles.ourStoryPhotoNote}>
            <span
              className={styles.ourStoryNoteFlower}
              aria-hidden="true"
            >
              ✳
            </span>

            <p>Same sky, different journeys, now one story.</p>

            <span
              className={styles.ourStoryNoteRule}
              aria-hidden="true"
            />
          </div>

          <span
            className={styles.ourStoryBotanical}
            aria-hidden="true"
          >
            ❧
          </span>
        </div>

        {/* Right: introduction and story accordion */}
        <div className={styles.ourStoryContent}>
          <header className={styles.ourStoryHeader}>
            <div
              className={styles.ourStoryOrnament}
              aria-hidden="true"
            >
              <span />
              <span>✧</span>
              <span />
            </div>

            <p className={styles.ourStoryEyebrow}>OUR STORY</p>

            <h2
              id={`${accordionId}-heading`}
              className={styles.ourStoryTitle}
            >
              Different Paths,
              <br />
              A Shared Journey
            </h2>

            <p className={styles.ourStoryIntroduction}>
              {introduction}
            </p>

            <div
              className={styles.ourStoryDivider}
              aria-hidden="true"
            >
              <span />
              <span>✦</span>
              <span />
            </div>
          </header>

          <div className={styles.storyAccordion}>
            <div className={styles.storyAccordionIntro}>
              <span className={styles.storyAccordionIntroLine} />
              <p>CHAPTERS OF US</p>
              <span className={styles.storyAccordionIntroLine} />
            </div>

            {milestones.map((milestone, index) => {
              const isOpen = openMilestone === milestone.id;
              const panelId = `${accordionId}-${milestone.id}-panel`;
              const triggerId = `${accordionId}-${milestone.id}-trigger`;

              return (
                <article
                  key={milestone.id}
                  className={`${styles.storyChapter} ${
                    isOpen ? styles.storyChapterOpen : ""
                  }`}
                >
                  <span
                    className={styles.storyChapterRail}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    id={triggerId}
                    className={styles.storyChapterTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    <span
                      className={styles.storyChapterNumber}
                      aria-hidden="true"
                    >
                      {milestoneNumbers[milestone.id]}
                    </span>

                    <span
                      className={styles.storyChapterSymbol}
                      aria-hidden="true"
                    >
                      {milestoneSymbols[milestone.id]}
                    </span>

                    <span className={styles.storyChapterHeading}>
                      <span className={styles.storyChapterLabel}>
                        {milestone.label}
                      </span>

                      <span className={styles.storyChapterDate}>
                        {milestone.date}
                      </span>
                    </span>

                    <span
                      className={styles.storyChapterToggle}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className={styles.storyChapterPanel}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                  >
                    <div className={styles.storyChapterPanelInner}>
                      <span
                        className={styles.storyChapterPanelOrnament}
                        aria-hidden="true"
                      >
                        {milestoneSymbols[milestone.id]}
                      </span>

                      <div className={styles.storyChapterDescription}>
                        <p>{milestone.description}</p>

                        {index === milestones.length - 1 && (
                          <span className={styles.storyChapterClosing}>
                            And so, forever begins.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <footer className="flex justify-center items-center mt-3">
          <span aria-hidden="true">✧</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
