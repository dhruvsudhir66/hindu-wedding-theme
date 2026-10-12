
"use client";

import { useMemo } from "react";
import styles from "../styles/template4.module.css";

type CountdownCalendarProps = {
  weddingDate: string;
  coupleNames: string;
  venue?: string;
  ganeshImage?: string;
};

function getIndianDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
  };
}

export default function CountdownCalendar({
  weddingDate,
  coupleNames,
  venue = "",
  ganeshImage = "/weddings/template4/images/ganesh.png",
}: CountdownCalendarProps) {
  const wedding = useMemo(() => {
    const date = new Date(weddingDate);

    if (!Number.isFinite(date.getTime())) return null;

    const { year, month, day } = getIndianDateParts(date);
    const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    return {
      date,
      year,
      month,
      day,
      firstDay,
      daysInMonth,
      monthName: new Intl.DateTimeFormat("en-IN", {
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(date),
      fullDate: new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(date),
    };
  }, [weddingDate]);

  const calendarUrl = useMemo(() => {
    if (!wedding) return "#";

    const end = new Date(
      wedding.date.getTime() + 3 * 60 * 60 * 1000
    );

    const format = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Wedding Celebration | ${coupleNames}`,
      dates: `${format(wedding.date)}/${format(end)}`,
      location: venue,
      details: `Join us to celebrate the wedding of ${coupleNames}.`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [wedding, coupleNames, venue]);

  if (!wedding) return null;

  const cells: Array<number | null> = [
    ...Array.from({ length: wedding.firstDay }, () => null),
    ...Array.from(
      { length: wedding.daysInMonth },
      (_, index) => index + 1
    ),
  ];

  return (
    <section className={styles.weddingCalendarSection}>
      <div className={styles.weddingCalendarCard}>
        <div className={styles.weddingCalendarArtPanel}>
          <span
            className={`${styles.calendarCorner} ${styles.calendarCornerTop}`}
            aria-hidden="true"
          />

          <span
            className={`${styles.calendarCorner} ${styles.calendarCornerBottom}`}
            aria-hidden="true"
          />

          <div className={styles.calendarArtContent}>
            <p className={styles.weddingCalendarEyebrow}>
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div className={styles.weddingCalendarGaneshFrame}>
              <span
                className={styles.calendarHalo}
                aria-hidden="true"
              />

              <img
                className={styles.weddingCalendarGanesh}
                src={ganeshImage}
                alt="Lord Ganesha"
                loading="lazy"
              />
            </div>

            <p className={styles.calendarArtCaption}>
              Auspicious beginnings
            </p>

            <div
              className={styles.calendarArtDivider}
              aria-hidden="true"
            >
              <span />
              <span>✦</span>
              <span />
            </div>

            <p className={styles.calendarArtDate}>{wedding.day}</p>

            <p className={styles.calendarArtMonth}>
              {wedding.monthName}
            </p>

            <p className={styles.calendarArtCouple}>{coupleNames}</p>
          </div>

          <span
            className={styles.calendarArtSun}
            aria-hidden="true"
          >
            ✳
          </span>
        </div>

        <div className={styles.weddingCalendarDetails}>
          <header className={styles.weddingCalendarHeader}>
            <div>
              <p className={styles.calendarSectionEyebrow}>
                THE WEDDING DAY
              </p>

              <h2 className={styles.weddingCalendarTitle}>
                Save the date
              </h2>
            </div>

            <span
              className={styles.calendarHeaderFlower}
              aria-hidden="true"
            >
              ✿
            </span>
          </header>

          <div className={styles.weddingCalendarMonth}>
            {wedding.monthName}
          </div>

          <div
            className={styles.weddingCalendarGrid}
            role="grid"
            aria-label={`Calendar for ${wedding.monthName}`}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map(
              (day, index) => (
                <div
                  className={styles.weddingCalendarWeekday}
                  key={`${day}-${index}`}
                  role="columnheader"
                >
                  {day}
                </div>
              )
            )}

            {cells.map((day, index) => (
              <div
                className={styles.weddingCalendarCell}
                key={`${wedding.year}-${wedding.month}-${index}`}
                role="gridcell"
                aria-label={
                  day
                    ? `${day}${
                        day === wedding.day ? ", wedding day" : ""
                      }`
                    : undefined
                }
              >
                {day &&
                  (day === wedding.day ? (
                    <a
                      className={styles.weddingCalendarWeddingDay}
                      href={calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Add wedding date, ${wedding.fullDate}, to Google Calendar`}
                      title="Add wedding date to Google Calendar"
                    >
                      {day}
                      <span
                        className={styles.weddingCalendarMark}
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className={styles.weddingCalendarDay}>
                      {day}
                    </span>
                  ))}
              </div>
            ))}
          </div>

          <p className={styles.calendarInteractionHint}>
            <span aria-hidden="true">↗</span>
            Tap the highlighted date to save it to your calendar
          </p>

          <div className={styles.weddingCalendarDateSummary}>
            <span
              className={styles.calendarDateIcon}
              aria-hidden="true"
            >
              ✦
            </span>

            <div>
              <p className={styles.weddingCalendarDate}>
                {wedding.fullDate}
              </p>

              {venue && (
                <p className={styles.weddingCalendarVenue}>
                  {venue}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
