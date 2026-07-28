import Image from "next/image";

type LogoProps = {
  className?: string;
  /** usa la versione a lettere crema per sfondi scuri */
  onDark?: boolean;
  priority?: boolean;
};

/** Logo ufficiale Alo Alo Pua Poke (estratto dal brandbook). */
export default function Logo({ className = "h-12 w-auto", onDark = false, priority = false }: LogoProps) {
  return (
    <Image
      src={onDark ? "/img/logo-cream.png" : "/img/logo-green.png"}
      alt="Alo Alo Pua Poke"
      width={669}
      height={534}
      priority={priority}
      className={className}
    />
  );
}
