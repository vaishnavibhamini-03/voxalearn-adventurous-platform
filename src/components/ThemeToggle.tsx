import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border-2 border-border bg-surface/70 px-3 text-foreground transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {isDark ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
      <span className="font-pixel text-[9px] uppercase">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
