import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  tone: "error" | "success";
  children: ReactNode;
  className?: string;
};

/** Shared, VoxaLearn-styled inline message used across all authentication forms. */
export function FormAlert({ tone, children, className }: Props) {
  const Icon = tone === "success" ? CheckCircle2 : AlertTriangle;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "pixel-frame flex items-start gap-3 bg-card/90 p-4 text-sm",
        tone === "error" ? "text-destructive" : "text-success",
        className,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p className="min-w-0 text-card-foreground">{children}</p>
    </div>
  );
}
