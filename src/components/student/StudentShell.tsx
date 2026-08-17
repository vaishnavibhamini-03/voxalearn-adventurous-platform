import { Link } from "@tanstack/react-router";
import { BookOpen, LayoutDashboard, Settings, Trophy, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { cn } from "@/lib/utils";

export const STUDENT_LINKS = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/my-courses", label: "My Courses", Icon: BookOpen },
  { to: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { to: "/profile", label: "Profile", Icon: UserRound },
  { to: "/settings", label: "Settings", Icon: Settings },
] as const;

/** Shared layout for every authenticated student page. */
export function StudentShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="student-sky relative">
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:py-10">
          <nav
            aria-label="Student navigation"
            className="hidden w-56 shrink-0 lg:block"
          >
            <ul className="pixel-frame sticky top-24 flex flex-col gap-1 bg-card/80 p-3">
              {STUDENT_LINKS.map(({ to, label, Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    activeProps={{ className: "bg-primary/15 text-accent border-accent/60" }}
                    inactiveProps={{ className: "border-transparent text-muted-foreground" }}
                    className="flex min-h-11 items-center gap-2 rounded-md border-2 px-3 text-sm font-medium transition-colors hover:text-accent"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1">
            <header className="mb-6">
              <h1 className="font-pixel text-base leading-relaxed text-foreground sm:text-xl">{title}</h1>
              {subtitle ? (
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
              ) : null}
            </header>
            {children}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

export function Panel({
  title,
  children,
  className,
  action,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cn("pixel-frame bg-card/85 p-4 sm:p-5", className)}>
      {title ? (
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-pixel text-[10px] uppercase text-accent sm:text-[11px]">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border-2 border-dashed border-border/70 px-3 py-6 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block animate-pulse rounded-md border-2 border-border bg-surface/60", className)}
    />
  );
}
