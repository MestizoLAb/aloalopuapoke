import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  /** parola-accento in corsivo serif, sotto il titolo (stile Roy's) */
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** classi colore per occhiello e accento (override) */
  eyebrowClass?: string;
  accentClass?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  tone = "light",
  eyebrowClass,
  accentClass,
  className = "",
}: Props) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <span className={`eyebrow ${eyebrowClass ?? (dark ? "text-paper" : "text-forest-mid")}`}>
        {eyebrow}
      </span>
      <h2
        className={`mt-3 display-caps text-[2rem] leading-[1.05] sm:text-[2.6rem] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
        {accent && (
          <span
            className={`script mt-1 block text-[1.7em] normal-case leading-[1.05] tracking-normal ${
              accentClass ?? (dark ? "text-gold-soft" : "text-forest")
            }`}
          >
            {accent}
          </span>
        )}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-paper/85" : "text-ink-mid"
          } ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
