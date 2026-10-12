"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/template4.module.css";

type WeddingMusicProps = {
  src?: string;
  enabled?: boolean;
};

export default function WeddingMusic({
  src = "/weddings/template4/music/mast-magan.mpeg",
  enabled = true,
}: WeddingMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !enabled) return;

    let cancelled = false;

    const startMusic = async () => {
      try {
        await audio.play();

        if (!cancelled) {
          setIsPlaying(true);
        }
      } catch {
        // Browser autoplay restrictions may require the visitor
        // to press the play button.
        if (!cancelled) {
          setIsPlaying(false);
        }
      }
    };

    void startMusic();

    return () => {
      cancelled = true;
      audio.pause();
    };
  }, [src, enabled]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={styles.musicButton}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        aria-pressed={isPlaying}
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "♪"}</span>
        <span>{isPlaying ? "Pause music" : "Play music"}</span>
      </button>
    </>
  );
}