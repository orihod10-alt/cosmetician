"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface NavLink {
  label: string;
  href: string;
}

interface FooterProps {
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
}

export function Footer({ brandName, brandDescription, socialLinks, navLinks }: FooterProps) {
  return (
    <footer
      dir="rtl"
      className="relative overflow-hidden"
      style={{ backgroundColor: "oklch(35% 0.025 65)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <style>{`
        @keyframes watermark-drift {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(-4%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Drifting watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-display font-light whitespace-nowrap"
          style={{
            fontSize: "clamp(6rem, 22vw, 18rem)",
            lineHeight: 1,
            fontStyle: "italic",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.05), transparent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "watermark-drift 26s ease-in-out infinite",
          }}
        >
          {brandName}
        </span>
      </div>

      {/* Main content — entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-14 pt-20 md:pt-28 pb-10 md:pb-14"
      >
        {/* Logo + brand + social row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">

          {/* Logo + description */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, oklch(64% 0.07 8), oklch(54% 0.07 8))",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-light text-white text-xl leading-tight">{brandName}</p>
              <p className="font-body font-light text-white/60 text-sm mt-0.5 leading-snug">{brandDescription}</p>
            </div>
          </div>

          {/* Social links — spring scale on hover */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/60 hover:text-white"
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Nav links — underline slide-in on hover */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-14">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group font-body font-light text-sm text-white/60 hover:text-white transition-colors duration-300 pb-0.5"
            >
              {link.label}
              <span
                className="absolute bottom-0 right-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
              />
            </a>
          ))}
        </nav>

        {/* Gradient divider */}
        <div
          className="h-px mb-8"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Copyright — delayed fade */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="font-body font-light text-white/40 text-xs">
            © {new Date().getFullYear()} {brandName}. כל הזכויות שמורות.
          </p>
        </motion.div>

      </motion.div>
    </footer>
  );
}
