import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { pixelButtonClass } from "./PixelButton";
import { useAuth } from "@/lib/auth";
import { useStudentProfile } from "@/lib/student-data";
import { StudentAvatar } from "./StudentAvatar";

const PUBLIC_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/features", label: "Features" },
  { to: "/contact", label: "Contact" },
] as const;

const STUDENT_NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/my-courses", label: "My Courses" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loading, user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const navigate = useNavigate();
  const NAV_LINKS = isAuthenticated ? STUDENT_NAV_LINKS : PUBLIC_LINKS;

  const { data: profile } = useStudentProfile();
  const avatarId = profile?.avatar_url ?? null;

  const displayName =
    profile?.username ??
    (user?.user_metadata?.["username"] as string | undefined) ??
    (user?.user_metadata?.["full_name"] as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Adventurer";

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    setOpen(false);
    await navigate({ to: "/", replace: true });
    await signOut();
    setSigningOut(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between"
      >
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Sparkles className="size-5 shrink-0 text-accent" aria-hidden />
          <span className="truncate font-pixel text-sm text-foreground sm:text-base">VoxaLearn</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-accent border-accent" }}
                inactiveProps={{ className: "text-muted-foreground border-transparent" }}
                className="inline-flex min-h-11 items-center rounded-md border-b-2 px-3 text-sm font-medium transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {loading ? (
            <span
              aria-hidden
              className="h-9 w-40 animate-pulse rounded-md border-2 border-border bg-surface/60"
            />
          ) : isAuthenticated ? (
            <>
              <span className="inline-flex min-h-11 max-w-40 items-center gap-2 truncate px-2 text-sm font-medium text-foreground">
                <StudentAvatar avatarId={avatarId} size={28} />
                <span className="truncate">{displayName}</span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className={pixelButtonClass("outline", "sm")}
              >
                {signingOut ? "Signing out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={pixelButtonClass("outline", "sm")}>
                Login
              </Link>
              <Link to="/register" className={pixelButtonClass("gold", "sm")}>
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border-2 border-border bg-surface/70 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t-2 border-border bg-background/95 px-4 pb-5 lg:hidden">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-accent" }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-border/60 text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            {loading ? (
              <span aria-hidden className="h-12 animate-pulse rounded-md border-2 border-border bg-surface/60" />
            ) : isAuthenticated ? (
              <>
                <span className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-foreground">
                  <UserRound className="size-4 shrink-0 text-accent" aria-hidden />
                  <span className="truncate">{displayName}</span>
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className={pixelButtonClass("outline", "md")}
                >
                  {signingOut ? "Signing out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className={pixelButtonClass("outline", "md")}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className={pixelButtonClass("gold", "md")}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
