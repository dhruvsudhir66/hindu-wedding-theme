
"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "../styles/template4.module.css";

type RSVPChoice = "attending" | "declining";

export type RSVPResponse = {
  name: string;
  attendance: RSVPChoice;
  message: string;
};

type RSVPProps = {
  coupleNames: string;
  weddingDate: string;
  venue?: string;
  onSubmit: (response: RSVPResponse) => Promise<void>;
};

export default function RSVP({
  coupleNames,
  weddingDate,
  venue,
  onSubmit,
}: RSVPProps) {
  const id = useId();

  const [attendance, setAttendance] = useState<RSVPChoice | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function chooseAttendance(choice: RSVPChoice) {
    setAttendance(choice);
    setName("");
    setMessage("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!attendance) return;

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        attendance,
        message: message.trim(),
      });

      setSubmitted(true);
    } catch {
      setError("Something went wrong while sending your reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetReply() {
    setSubmitted(false);
    setAttendance(null);
    setName("");
    setMessage("");
    setError("");
  }

  const isAttending = attendance === "attending";

  return (
    <section
      className={styles.rsvpSection}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.rsvpInner}>
        <div className={styles.rsvpTopOrnament} aria-hidden="true">
          <span />
          <span className={styles.rsvpOrnamentSymbol}>❧</span>
          <span />
        </div>

        <p className={styles.rsvpEyebrow}>WITH LOVE, WE INVITE YOU</p>

        <h2 id={`${id}-title`} className={styles.rsvpTitle}>
          A Place in
          <br />
          <span>Our Story</span>
        </h2>

        <p className={styles.rsvpIntroduction}>
          {coupleNames} would be so happy to have you with us
          as we begin this beautiful new chapter.
        </p>

        <div className={styles.rsvpEventDetails}>
          <span>{weddingDate}</span>

          {venue && (
            <>
              <span aria-hidden="true" className={styles.rsvpDetailDivider}>
                ✧
              </span>
              <span>{venue}</span>
            </>
          )}
        </div>

        <div className={styles.rsvpInvitationDivider} aria-hidden="true">
          <span>✳</span>
        </div>

        {submitted ? (
          <div className={styles.rsvpConfirmation} role="status">
            <span className={styles.rsvpConfirmationIcon} aria-hidden="true">
              ✿
            </span>

            <h3>
              {isAttending
                ? "We'll save you a little happiness."
                : "We'll carry your wishes with us."}
            </h3>

            <p>
              {isAttending
                ? "Thank you for being part of our day. We cannot wait to celebrate together."
                : "Thank you for keeping us in your thoughts and sending us your love."}
            </p>

            <span className={styles.rsvpConfirmationFlourish} aria-hidden="true">
              With love, always
            </span>
          </div>
        ) : (
          <form className={styles.rsvpForm} onSubmit={handleSubmit}>
            <fieldset className={styles.rsvpChoiceFieldset}>
              <legend className={styles.rsvpQuestion}>
                Will you be there?
              </legend>

              <div className={styles.rsvpChoices}>
                <button
                  type="button"
                  className={`${styles.rsvpChoice} ${
                    isAttending ? styles.rsvpChoiceSelected : ""
                  }`}
                  aria-pressed={isAttending}
                  onClick={() => chooseAttendance("attending")}
                >
                  <span className={styles.rsvpChoiceIcon} aria-hidden="true">
                    ✿
                  </span>

                  <span className={styles.rsvpChoiceText}>
                    <span className={styles.rsvpChoiceTitle}>
                      Count me in
                    </span>
                    <span className={styles.rsvpChoiceCaption}>
                      Save a place for me
                    </span>
                  </span>

                  <span className={styles.rsvpChoiceMark} aria-hidden="true">
                    {isAttending ? "♥" : "♡"}
                  </span>
                </button>

                <button
                  type="button"
                  className={`${styles.rsvpChoice} ${
                    attendance === "declining"
                      ? styles.rsvpChoiceSelected
                      : ""
                  }`}
                  aria-pressed={attendance === "declining"}
                  onClick={() => chooseAttendance("declining")}
                >
                  <span className={styles.rsvpChoiceIcon} aria-hidden="true">
                    ❧
                  </span>

                  <span className={styles.rsvpChoiceText}>
                    <span className={styles.rsvpChoiceTitle}>
                      With you in spirit
                    </span>
                    <span className={styles.rsvpChoiceCaption}>
                      Sending my love
                    </span>
                  </span>

                  <span className={styles.rsvpChoiceMark} aria-hidden="true">
                    {attendance === "declining" ? "♥" : "♡"}
                  </span>
                </button>
              </div>
            </fieldset>

            {attendance && (
              <div
                key={attendance}
                className={styles.rsvpDetails}
              >
                <div className={styles.rsvpFormHeading}>
                  <span className={styles.rsvpFormFlourish} aria-hidden="true">
                    ❧
                  </span>

                  <h3>
                    {isAttending
                      ? "Leave us a little note"
                      : "Send us your blessings"}
                  </h3>

                  <p>
                    {isAttending
                      ? "We would love to know who's joining us."
                      : "A few words from you would mean so much."}
                  </p>
                </div>

                <div className={styles.rsvpField}>
                  <label htmlFor={`${id}-name`}>Your name</label>

                  <input
                    id={`${id}-name`}
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Write your name here..."
                    required
                    maxLength={100}
                  />
                </div>

                <div className={styles.rsvpField}>
                  <label htmlFor={`${id}-message`}>
                    {isAttending ? "A note for us" : "Your wishes"}
                    <span>if you wish</span>
                  </label>

                  <textarea
                    id={`${id}-message`}
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={
                      isAttending
                        ? "A wish, a little thought, or something you'd like to tell us..."
                        : "A blessing or a few words from the heart..."
                    }
                    rows={3}
                    maxLength={1000}
                  />
                </div>

                {error && (
                  <p className={styles.rsvpError} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.rsvpSubmit}
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? "Sending with love..." : "Send with love"}
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}
          </form>
        )}

        <div className={styles.rsvpBottomOrnament} aria-hidden="true">
          <span>✧</span>
        </div>
      </div>

      {submitted && (
        <button
          type="button"
          className={styles.rsvpEditReply}
          onClick={resetReply}
        >
          Send another reply
        </button>
      )}
    </section>
  );
}
