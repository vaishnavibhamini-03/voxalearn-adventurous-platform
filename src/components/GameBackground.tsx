import desktopBg from "@/assets/hero-desktop.jpg";
import mobileBg from "@/assets/hero-mobile.jpg";
import { cn } from "@/lib/utils";

const STARS = [
  { top: "12%", left: "18%", delay: "0s" },
  { top: "8%", left: "42%", delay: "0.6s" },
  { top: "22%", left: "63%", delay: "1.2s" },
  { top: "16%", left: "78%", delay: "1.8s" },
  { top: "31%", left: "30%", delay: "2.4s" },
  { top: "6%", left: "88%", delay: "0.9s" },
  { top: "27%", left: "8%", delay: "1.5s" },
  { top: "38%", left: "52%", delay: "2.1s" },
];

/**
 * Static pixel-art environment with a lightweight overlay of twinkling stars.
 * Uses a portrait crop on small screens and a wide crop from tablet upwards.
 */
export function GameBackground({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopBg} />
        <img
          src={mobileBg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover object-center"
        />
      </picture>

      {/* readability veil + theme tint */}
      <div className="hero-scrim absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {STARS.map((star, i) => (
        <span
          key={i}
          className="animate-twinkle absolute size-[3px] rounded-none bg-accent"
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        />
      ))}
    </div>
  );
}

/** Compact decorative sky band used on inner pages. */
export function PageBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopBg} />
        <img
          src={mobileBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </picture>
      <div className="absolute inset-0 bg-background/72 dark:bg-background/78" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
    </div>
  );
}
