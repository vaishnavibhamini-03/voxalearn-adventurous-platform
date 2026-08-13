import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-surface/60">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 shrink-0 text-accent" aria-hidden />
            <span className="font-pixel text-sm text-foreground">VOXALEARN</span>
          </div>
          <p className="mt-3 font-pixel text-[9px] leading-relaxed text-accent">
            Learn Smarter. Speak Freely. Grow Faster.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            A pixel-art learning world where skills are earned through interactive quests, immersive
            environments and friendly guidance.
          </p>
        </div>

        <nav aria-label="Quick links" className="min-w-0">
          <h2 className="font-pixel text-[10px] uppercase text-foreground">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/features", label: "Features" },
              { to: "/courses", label: "Courses" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="font-pixel text-[10px] uppercase text-foreground">Courses</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {["Programming", "Mathematics", "Science", "English"].map((c) => (
              <li key={c}>
                <Link
                  to="/courses"
                  className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-accent"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Company" className="min-w-0">
          <h2 className="font-pixel text-[10px] uppercase text-foreground">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                to="/contact"
                className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-accent"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-accent"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-accent"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/70 px-4 py-5">
        <p className="mx-auto max-w-7xl text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} VoxaLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
