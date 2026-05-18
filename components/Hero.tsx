"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadingVideo } from "@/components/ui/FadingVideo";

const VIDEO_SRC = "https://videos.pexels.com/video-files/6725001/6725001-uhd_2560_1440_25fps.mp4";
const WA_LINK = "https://wa.me/972501234567";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE_WORDS = ["הטיפול", "שתמיד", "חלמת", "עליו"];

function BlurText({ words }: { words: string[] }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <span aria-label={words.join(" ")}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          style={{ marginInlineEnd: "0.25em" }}
          initial={prefersReducedMotion ? false : { filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5 + i * 0.1,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const baseAnim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { filter: "blur(10px)", opacity: 0, y: 20 },
          animate: { filter: "blur(0px)", opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section
      data-hero
      dir="rtl"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Video background */}
      <FadingVideo src={VIDEO_SRC} />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)",
          zIndex: 1,
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent, oklch(35% 0.025 65))",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center flex-1 pt-24 pb-28 px-4 text-center"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          className="liquid-glass rounded-full flex items-center gap-0 mb-10"
          style={{ padding: "6px 16px 6px 6px" }}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { filter: "blur(10px)", opacity: 0, y: 20 },
                animate: { filter: "blur(0px)", opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4, ease: EASE },
              })}
        >
          <span
            className="rounded-full text-xs font-body font-medium px-3 py-1"
            style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#1a1410" }}
          >
            חדש
          </span>
          <span className="text-sm text-white/90 font-body pr-3">
            טיפולים יוקרתיים · מגיעים אליך הביתה
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display leading-[0.9] tracking-[-0.03em] max-w-3xl text-white mb-6"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
        >
          <BlurText words={HEADLINE_WORDS} />
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-base text-white/80 max-w-xl font-body font-light leading-relaxed mt-2 mb-8"
          {...baseAnim(0.8)}
        >
          קוסמטיקאיות שנבחרו ביד — כל אחת עם עולם אסתטי משלה. בחרי את מי שמדברת אליך ותיהני מחוויה שמגיעה אליך.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          {...baseAnim(1.1)}
        >
          <a
            href="#cosmeticians"
            className="liquid-glass-strong rounded-full flex items-center gap-2 text-white text-sm font-body font-medium"
            style={{ padding: "12px 24px" }}
          >
            גלי את הקוסמטיקאית שלך
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 text-sm font-body font-light"
            style={{ padding: "12px 4px" }}
          >
            הזמיני דרך וואטסאפ
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          {...baseAnim(1.3)}
        >
          {[
            { number: "50+", label: "קוסמטיקאיות מוסמכות" },
            { number: "500+", label: "לקוחות מרוצות" },
          ].map(({ number, label }) => (
            <div
              key={number}
              className="liquid-glass rounded-2xl p-5 text-center"
              style={{ width: "200px" }}
            >
              <div
                className="font-display text-white leading-none mb-1"
                style={{ fontSize: "2.5rem", fontStyle: "italic" }}
              >
                {number}
              </div>
              <div className="text-white/70 text-xs font-body font-light">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                y: [0, 8, 0],
                transition: {
                  opacity: { delay: 1.5, duration: 0.6, ease: "easeOut" },
                  y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
                },
              },
            })}
      >
        <span
          className="liquid-glass rounded-full text-white/60 text-xs font-body"
          style={{ padding: "6px 12px", display: "inline-block" }}
        >
          גללי למטה ↓
        </span>
      </motion.div>
    </section>
  );
}
