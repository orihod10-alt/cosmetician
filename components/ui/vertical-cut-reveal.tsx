"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ElementType } from "react";

type SpringConfig = {
  type?: "spring";
  stiffness?: number;
  damping?: number;
  delay?: number;
};

export interface VerticalCutRevealProps {
  children: string;
  splitBy?: "words" | "chars";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: SpringConfig;
  containerClassName?: string;
  wordLevelClassName?: string;
  as?: ElementType;
}

function getDelay(
  i: number,
  total: number,
  staggerFrom: VerticalCutRevealProps["staggerFrom"],
  staggerDuration: number,
  baseDelay: number
): number {
  if (staggerFrom === "last") return baseDelay + (total - 1 - i) * staggerDuration;
  if (staggerFrom === "center") {
    const center = Math.floor(total / 2);
    return baseDelay + Math.abs(i - center) * staggerDuration;
  }
  return baseDelay + i * staggerDuration; // "first" (default)
}

// Each word/char is revealed by sliding up from behind a clipping mask.
// The outer overflow-hidden span acts as the mask; the inner span moves.
export function VerticalCutReveal({
  children,
  splitBy = "words",
  staggerDuration = 0.08,
  staggerFrom = "first",
  transition = {},
  containerClassName,
  wordLevelClassName,
  as: Tag = "div",
}: VerticalCutRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });
  const reduced = useReducedMotion();

  const segments =
    splitBy === "words" ? children.split(" ") : children.split("");

  const springConfig = {
    type: "spring" as const,
    stiffness: transition.stiffness ?? 200,
    damping: transition.damping ?? 21,
  };

  if (reduced) {
    const StaticEl = Tag as keyof JSX.IntrinsicElements;
    return <StaticEl className={containerClassName}>{children}</StaticEl>;
  }

  const ContainerEl = Tag as keyof JSX.IntrinsicElements;

  return (
    <ContainerEl
      ref={ref as React.Ref<never>}
      className={containerClassName}
      aria-label={children}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {segments.map((seg, i) => {
        const delay = getDelay(
          i,
          segments.length,
          staggerFrom,
          staggerDuration,
          transition.delay ?? 0
        );

        return (
          <span
            key={i}
            className={wordLevelClassName}
            style={{ display: "inline-block" }}
          >
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
              }}
            >
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ ...springConfig, delay }}
                style={{ display: "inline-block" }}
                aria-hidden
              >
                {seg}
              </motion.span>
            </span>
          </span>
        );
      })}
    </ContainerEl>
  );
}
