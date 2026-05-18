"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { TextEffect } from "./text-effect";
import { Counter } from "./animated-counter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Returns { num, suffix } for "50+" → {50, "+"}, "4.9" → {null, ""}
function parseStatValue(value: string): { num: number | null; suffix: string } {
  const m = value.match(/^(\d+)([+%]?)$/);
  if (!m) return { num: null, suffix: "" };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

export type ServiceItem = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export interface AboutUsSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageButtonText: string;
  onImageButtonClick?: () => void;
  servicesLeft: ServiceItem[];
  servicesRight: ServiceItem[];
  stats: StatItem[];
  accentColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
}

function ServiceCard({
  item,
  accentColor,
  delay,
  side,
}: {
  item: ServiceItem;
  accentColor: string;
  delay: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const { Icon } = item;

  const xInitial = side === "right" ? 20 : -20;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: xInitial, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={reduced ? {} : { y: -3, transition: { duration: 0.2 } }}
      className="flex flex-col gap-2 py-6"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          whileHover={
            reduced
              ? {}
              : { rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }
          }
          style={{ display: "inline-flex" }}
        >
          <Icon size={16} color={accentColor} className="flex-shrink-0" />
        </motion.span>
        <h3 className="font-['Frank_Ruhl_Libre'] italic text-white text-[1.05rem] leading-snug">
          {item.title}
        </h3>
      </div>
      <p
        className="font-['Heebo'] font-light text-[0.82rem] leading-relaxed"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {item.description}
      </p>
    </motion.div>
  );
}

export function AboutUsSection({
  id = "about",
  eyebrow,
  title,
  description,
  imageUrl,
  imageAlt,
  imageButtonText,
  onImageButtonClick,
  servicesLeft,
  servicesRight,
  stats,
  accentColor,
  bgGradientFrom,
  bgGradientTo,
}: AboutUsSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const imageColRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageColRef, { once: true, margin: "-80px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      dir="rtl"
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${bgGradientFrom}, ${bgGradientTo})`,
      }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-24 md:pt-36 pb-12 md:pb-16 flex flex-col items-center text-center">
        <p
          className="text-[11px] tracking-[0.28em] uppercase font-['Heebo'] mb-5 mx-auto"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <TextEffect preset="blur" per="word" delay={0.1}>
            {eyebrow}
          </TextEffect>
        </p>

        <motion.h2
          ref={headingRef}
          initial={reduced ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={
            headingInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="font-['Frank_Ruhl_Libre'] italic text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-center mx-auto mb-8 max-w-3xl"
        >
          {title}
        </motion.h2>

        <p
          className="font-['Heebo'] font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <TextEffect preset="slide" per="word" delay={0.4}>
            {description}
          </TextEffect>
        </p>
      </div>

      {/* Three-column layout */}
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px_1fr] lg:grid-cols-[1fr_320px_1fr] gap-8 md:gap-12 items-start">

          {/* DOM col 1 = visual RIGHT in RTL */}
          <div className="order-2 md:order-none">
            {servicesRight.map((item, i) => (
              <ServiceCard
                key={item.title}
                item={item}
                accentColor={accentColor}
                delay={0.05 + i * 0.12}
                side="right"
              />
            ))}
          </div>

          {/* Center image */}
          <div
            ref={imageColRef}
            className="flex flex-col items-center gap-5 order-1 md:order-none"
          >
            <div className="relative w-full" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
              <motion.div
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
                initial={
                  reduced ? false : { opacity: 0, scale: 0.92, filter: "blur(8px)" }
                }
                animate={
                  imageInView
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : {}
                }
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                  src={imageUrl}
                />
              </motion.div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to bottom, oklch(35% 0.025 65), transparent)', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, oklch(35% 0.025 65), transparent)', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '25%', background: 'linear-gradient(to right, oklch(35% 0.025 65), transparent)', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '25%', background: 'linear-gradient(to left, oklch(35% 0.025 65), transparent)', pointerEvents: 'none', zIndex: 10 }} />
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={imageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
            >
              <motion.button
                whileHover={reduced ? {} : { scale: 1.03, x: -4 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onClick={onImageButtonClick}
                className="font-['Heebo'] text-sm tracking-[0.08em] px-7 py-3"
                style={{
                  border: `1px solid ${accentColor}`,
                  color: accentColor,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  transition: "background-color 0.22s ease, color 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = accentColor;
                  el.style.color = "oklch(97% 0.005 65)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = accentColor;
                }}
              >
                {imageButtonText}
              </motion.button>
            </motion.div>
          </div>

          {/* DOM col 3 = visual LEFT in RTL */}
          <div className="order-3 md:order-none">
            {servicesLeft.map((item, i) => (
              <ServiceCard
                key={item.title}
                item={item}
                accentColor={accentColor}
                delay={0.05 + i * 0.12}
                side="left"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="max-w-7xl mx-auto px-8 md:px-16 py-14 md:py-20"
      >
        <div
          className="grid grid-cols-4 gap-8 pt-10 justify-items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {stats.map((stat, i) => {
            const { num, suffix } = parseStatValue(stat.value);
            const canAnimate = num !== null;

            return (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE }}
                whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-1 text-center"
              >
                <div
                  className="font-['Frank_Ruhl_Libre'] leading-none flex items-baseline gap-0.5"
                  style={{ color: accentColor }}
                >
                  {canAnimate ? (
                    <>
                      <Counter
                        end={num!}
                        duration={num! >= 200 ? 20 : 15}
                        fontSize={44}
                      />
                      {suffix && (
                        <span
                          className="font-['Frank_Ruhl_Libre']"
                          style={{ fontSize: 28 }}
                        >
                          {suffix}
                        </span>
                      )}
                    </>
                  ) : (
                    <span style={{ fontSize: 44 }}>{stat.value}</span>
                  )}
                </div>

                <span
                  className="font-['Heebo'] font-light text-xs tracking-wide"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {stat.label}
                </span>

                <motion.div
                  initial={reduced ? false : { width: "40px" }}
                  animate={statsInView ? { width: "64px" } : { width: "40px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1 + 0.3,
                    ease: EASE,
                  }}
                  style={{ height: "1px", backgroundColor: accentColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
