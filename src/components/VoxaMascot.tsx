import voxa from "@/assets/voxa.png";
import { cn } from "@/lib/utils";

export function VoxaMascot({
  className,
  message = "Welcome to VoxaLearn!",
  size = 128,
  bubbleSide = "left",
}: {
  className?: string;
  message?: string;
  size?: number;
  bubbleSide?: "left" | "right" | "top";
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        bubbleSide === "right" && "flex-row-reverse",
        bubbleSide === "top" && "flex-col items-center gap-1",
        className,
      )}
    >
      {message ? (
        <p className="max-w-[9rem] rounded-md border-2 border-border bg-surface/90 px-3 py-2 text-[11px] leading-snug font-medium text-foreground shadow-[0_4px_0_0_var(--pixel-shadow)] sm:max-w-[11rem] sm:text-xs">
          {message}
        </p>
      ) : null}
      <img
        src={voxa}
        alt="Voxa, the VoxaLearn learning companion"
        width={size}
        height={size}
        loading="lazy"
        style={{ width: size, height: size }}
        className="animate-voxa drop-shadow-[0_0_20px_var(--glow)]"
      />
    </div>
  );
}
