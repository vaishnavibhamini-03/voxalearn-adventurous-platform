import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "magic";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-pixel uppercase tracking-wide select-none rounded-md border-2 transition-transform duration-150 active:translate-y-[3px] active:shadow-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-gold-foreground border-gold-foreground/70 shadow-[0_5px_0_0_var(--gold-deep)] hover:brightness-110 hover:-translate-y-[1px]",
  outline:
    "bg-surface/70 text-foreground border-accent/70 shadow-[0_5px_0_0_var(--pixel-shadow)] hover:bg-surface hover:-translate-y-[1px] hover:text-accent",
  magic:
    "bg-primary text-primary-foreground border-primary-foreground/30 shadow-[0_5px_0_0_var(--pixel-shadow)] hover:brightness-110 hover:-translate-y-[1px]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-3 text-[10px]",
  md: "min-h-12 px-5 text-[11px] sm:text-xs",
  lg: "min-h-14 px-6 text-xs sm:text-sm",
};

export function pixelButtonClass(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function PixelButton({ variant = "gold", size = "md", className, ...props }: ButtonProps) {
  return <button className={pixelButtonClass(variant, size, className)} {...props} />;
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function PixelLinkButton({ variant = "gold", size = "md", className, ...props }: LinkProps) {
  return <Link className={pixelButtonClass(variant, size, className)} {...props} />;
}
