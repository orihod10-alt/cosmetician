"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  portraitImage?: string;
  sectionStyle?: React.CSSProperties;
}

const ROTATIONS = [-1.5, 1, -0.5, 1.5, -1, 0.5, -1.5, 1, -1.5, 1, -0.5, 1.5, -1, 0.5, -1.5, 1];
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AnimatedMarqueeHero({ tagline, title, description, ctaText, images, portraitImage, sectionStyle }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const allImages = [...images, ...images];

  return (
    <section
      dir="rtl"
      className="min-h-[100dvh] flex flex-col pt-[72px]"
      style={{ backgroundColor: "oklch(96.5% 0.008 65)", ...sectionStyle }}
    >
      {/* ── Text content ── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-16 md:py-20 max-w-[1440px] mx-auto w-full">
        <div className="md:grid md:items-end md:gap-14" style={{ gridTemplateColumns: portraitImage ? "1fr 260px" : "1fr" }}>

          {/* Text column — col 1 = physical right in RTL */}
          <div className="flex flex-col">
            {/* Tagline */}
            <motion.div
              className="mb-8 self-start"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span
                className="inline-block border font-body text-[11px] tracking-[0.3em] uppercase px-4 py-2"
                style={{ borderColor: "oklch(70% 0.07 8)", color: "oklch(50% 0.07 8)" }}
              >
                {tagline}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-display leading-[0.9] mb-8 text-6xl md:text-8xl"
              style={{ color: "#1a1410", fontWeight: 700 }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="font-body font-light text-base leading-relaxed mb-10"
              style={{ color: "oklch(46% 0.01 50)", maxWidth: "480px" }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              className="self-start"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            >
              <a
                href="#cosmeticians"
                className="inline-block font-body text-sm font-medium tracking-wider uppercase px-10 py-4 transition-all duration-200"
                style={{
                  backgroundColor: "oklch(64% 0.07 8)",
                  color: "oklch(98.5% 0.005 65)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = "0.85";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = "";
                  el.style.transform = "";
                }}
              >
                {ctaText}
              </a>
            </motion.div>
          </div>

          {/* Portrait column — col 2 = physical left in RTL, desktop only */}
          {portraitImage && (
            <motion.div
              className="hidden md:block relative overflow-hidden self-end"
              style={{ height: "380px" }}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            >
              <Image
                src={portraitImage}
                alt=""
                fill
                className="object-cover object-top"
                sizes="260px"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Marquee ── */}
      {/* dir="ltr" keeps flex items left-to-right regardless of page RTL */}
      <div dir="ltr" className="relative overflow-hidden pb-16">

        {/* Left fade mask */}
        <div
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(96.5% 0.008 65), transparent)" }}
        />
        {/* Right fade mask */}
        <div
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, oklch(96.5% 0.008 65), transparent)" }}
        />

        {/* Scrolling track — two copies for seamless loop */}
        <div
          className={`flex gap-4${prefersReducedMotion ? "" : " animate-marquee"}`}
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {allImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 h-56 md:h-72 w-40 md:w-52 rounded-xl overflow-hidden"
              style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 208px"
              />
              <div className="absolute inset-0 bg-black/5 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
