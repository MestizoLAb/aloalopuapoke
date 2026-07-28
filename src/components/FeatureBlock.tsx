import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import StoreButtons from "./StoreButtons";

type Props = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent?: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** lato della foto su desktop */
  side?: "left" | "right";
  /** colore accento + bottone (verde brand di default) */
  variant?: "green" | "blue" | "pink";
  /** immagine con sfondo trasparente (es. mockup telefono): object-contain */
  imageContain?: boolean;
  /** mostra i badge App Store / Google Play al posto del bottone */
  storeButtons?: boolean;
};

const variants = {
  green: {
    accent: "text-forest",
    btn: "border-forest text-forest-mid hover:bg-forest-mid hover:text-white",
  },
  blue: {
    accent: "text-lagoon-deep",
    btn: "border-lagoon-deep text-lagoon-deep hover:bg-lagoon-deep hover:text-paper",
  },
  pink: {
    accent: "text-pink-deep",
    btn: "border-pink-deep text-pink-deep hover:bg-pink-deep hover:text-paper",
  },
};

/** Blocco editoriale foto + testo (stile "alt-content" di Roy's, contenuto ~960px). */
export default function FeatureBlock({
  image,
  alt,
  title,
  accent,
  text,
  ctaLabel,
  ctaHref,
  side = "left",
  variant = "green",
  imageContain = false,
  storeButtons = false,
}: Props) {
  const v = variants[variant];
  return (
    <div className="py-12 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className={side === "right" ? "lg:order-2" : ""}>
          {imageContain ? (
            <div className="relative mx-auto aspect-square w-full max-w-sm lg:aspect-[4/5] lg:max-w-none">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 80vw, 460px"
                className="object-contain drop-shadow-[0_30px_60px_rgba(16,40,25,0.28)]"
              />
            </div>
          ) : (
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          )}
        </Reveal>

        <Reveal delay={100} className={side === "right" ? "lg:order-1" : ""}>
          <h2 className="display-caps text-[1.85rem] leading-[1.05] text-ink sm:text-[2.4rem]">
            {title}
            {accent && (
              <span className={`script mt-1 block text-[1.4em] normal-case leading-[1.05] tracking-normal ${v.accent}`}>
                {accent}
              </span>
            )}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-mid">{text}</p>
          <div className="mt-7">
            {storeButtons ? (
              <StoreButtons dark />
            ) : (
              ctaLabel &&
              ctaHref && (
                <Link href={ctaHref} className={`btn border-2 bg-transparent ${v.btn}`}>
                  {ctaLabel}
                </Link>
              )
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
