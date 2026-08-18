import { Bolt, Flame, Ghost, Leaf, Orbit, Sparkle, Swords, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Neutral, game-style avatar presets. No photo upload, no gender. */
export const AVATAR_PRESETS: { id: string; label: string; Icon: LucideIcon; tint: string }[] = [
  { id: "spark", label: "Spark", Icon: Sparkle, tint: "text-accent" },
  { id: "orbit", label: "Orbit", Icon: Orbit, tint: "text-primary" },
  { id: "rune", label: "Rune", Icon: Wand2, tint: "text-accent" },
  { id: "blade", label: "Blade", Icon: Swords, tint: "text-gold" },
  { id: "ember", label: "Ember", Icon: Flame, tint: "text-gold" },
  { id: "grove", label: "Grove", Icon: Leaf, tint: "text-success" },
  { id: "bolt", label: "Bolt", Icon: Bolt, tint: "text-accent" },
  { id: "wisp", label: "Wisp", Icon: Ghost, tint: "text-primary" },
];

export function getAvatarPreset(id: string | null | undefined) {
  return AVATAR_PRESETS.find((p) => p.id === id) ?? AVATAR_PRESETS[0]!;
}

export function StudentAvatar({
  avatarId,
  size = 48,
  className,
}: {
  avatarId?: string | null | undefined;
  size?: number;
  className?: string;
}) {
  const preset = getAvatarPreset(avatarId);
  const Icon = preset.Icon;

  return (
    <span
      role="img"
      aria-label={`${preset.label} avatar`}
      style={{ width: size, height: size }}
      className={cn(
        "pixel-frame inline-flex shrink-0 items-center justify-center bg-surface/80",
        className,
      )}
    >
      <Icon className={cn("size-1/2", preset.tint)} aria-hidden />
    </span>
  );
}
