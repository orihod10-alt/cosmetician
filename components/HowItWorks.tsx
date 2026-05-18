import RevealBlock from "./RevealBlock";

const steps = [
  {
    number: "01",
    title: "גלי",
    description:
      "עייני בפרופילי הקוסמטיקאיות, ראי את עבודותיהן ובחרי את המתאימה לך ביותר.",
    numberOnStart: true,
    bg: "oklch(97% 0.006 52)",
  },
  {
    number: "02",
    title: "הזמיני",
    description:
      "צרי קשר ישירות דרך וואטסאפ, קבעי מועד ופרטי הטיפול בקלות ובנוחות.",
    numberOnStart: false,
    bg: "oklch(96.5% 0.008 65)",
  },
  {
    number: "03",
    title: "תיהני",
    description:
      "הקוסמטיקאית מגיעה אליך עם כל הציוד, לחוויה יוקרתית ואישית בבית שלך.",
    numberOnStart: true,
    bg: "oklch(95% 0.016 72)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border">
      {steps.map((step) => (
        <RevealBlock
          key={step.number}
          className="flex items-center"
          style={{ backgroundColor: step.bg, minHeight: "72vh" }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-20 md:py-28 w-full">
            <div className="reveal-item md:grid md:grid-cols-2 md:gap-20 items-center flex flex-col gap-8">

              {step.numberOnStart ? (
                <>
                  {/* Number: physical right (RTL start) */}
                  <div>
                    <span
                      className="font-display block select-none"
                      style={{
                        fontSize: "clamp(8rem, 22vw, 16rem)",
                        lineHeight: 0.85,
                        fontStyle: "italic",
                        color: "oklch(82% 0.048 8)",
                        letterSpacing: "-0.04em",
                      }}
                      aria-hidden
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Text: physical left */}
                  <div>
                    <h2
                      className="font-display font-light text-text-primary mb-6"
                      style={{
                        fontSize: "clamp(3rem, 7vw, 5rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.title}
                    </h2>
                    <p
                      className="font-body font-light text-text-secondary leading-relaxed text-base"
                      style={{ maxWidth: "360px" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Text: physical right (RTL start) */}
                  <div>
                    <h2
                      className="font-display font-light text-text-primary mb-6"
                      style={{
                        fontSize: "clamp(3rem, 7vw, 5rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.title}
                    </h2>
                    <p
                      className="font-body font-light text-text-secondary leading-relaxed text-base"
                      style={{ maxWidth: "360px" }}
                    >
                      {step.description}
                    </p>
                  </div>
                  {/* Number: physical left (RTL end) */}
                  <div>
                    <span
                      className="font-display block select-none"
                      style={{
                        fontSize: "clamp(8rem, 22vw, 16rem)",
                        lineHeight: 0.85,
                        fontStyle: "italic",
                        color: "oklch(82% 0.048 8)",
                        letterSpacing: "-0.04em",
                      }}
                      aria-hidden
                    >
                      {step.number}
                    </span>
                  </div>
                </>
              )}

            </div>
          </div>
        </RevealBlock>
      ))}
    </section>
  );
}
