export default function HeroTransition() {
  return (
    <div
      dir="rtl"
      className="relative flex items-center justify-center"
      style={{
        height: "300px",
        background:
          "linear-gradient(to bottom, oklch(8% 0.008 65) 0%, oklch(22% 0.012 65) 30%, oklch(60% 0.008 65) 65%, oklch(96.5% 0.008 65) 100%)",
      }}
    >
      <p
        className="font-display font-light text-base md:text-xl text-center px-6 relative z-10"
        style={{
          color: "oklch(98% 0.004 65)",
          opacity: 0.5,
          fontStyle: "italic",
          letterSpacing: "0.02em",
        }}
      >
        כל אישה ראויה לטיפול שמגיע אליה
      </p>
    </div>
  );
}
