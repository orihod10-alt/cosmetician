"use client";

import { motion, useInView, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Preset = "blur" | "slide" | "fade";

const PRESETS: Record<
  Preset,
  { initial: TargetAndTransition; animate: TargetAndTransition; duration: number }
> = {
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    duration: 0.48,
  },
  slide: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    duration: 0.42,
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.4,
  },
};

export interface TextEffectProps {
  children: string;
  per?: "word" | "char";
  preset?: Preset;
  delay?: number;
  className?: string;
}

// Renders animated text segments (words or chars) with IntersectionObserver trigger.
// Wrap in a semantic element (p, h2, etc.) at the call site for correct HTML.
export function TextEffect({
  children,
  per = "word",
  preset = "fade",
  delay = 0,
  className,
}: TextEffectProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const segments =
    per === "word" ? children.split(" ") : children.split("");
  const stagger = per === "word" ? 0.048 : 0.018;
  const { initial, animate, duration } = PRESETS[preset];

  return (
    <span ref={ref} className={className} aria-label={children}>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          initial={initial}
          animate={inView ? animate : initial}
          transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          style={{ display: "inline-block" }}
          aria-hidden
        >
          {seg}
          {i < segments.length - 1 && per === "word" && " "}
        </motion.span>
      ))}
    </span>
  );
}
