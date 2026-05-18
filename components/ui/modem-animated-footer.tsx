"use client";

import { Sparkles } from "lucide-react";

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
      {/* Animated watermark */}
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
            animation: "watermark-breathe 6s ease-in-out infinite",
          }}
        >
          {brandName}
        </span>
      </div>

      <style>{`
        @keyframes watermark-breathe {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-14 pt-20 md:pt-28 pb-10 md:pb-14">

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

          {/* Social links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-14">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body font-light text-sm text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.label}
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

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <p className="font-body font-light text-white/40 text-xs">
            © {new Date().getFullYear()} {brandName}. כל הזכויות שמורות.
          </p>
        </div>

      </div>
    </footer>
  );
}
