import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

/**
 * Foundation for authenticated-only pages. Wrap any future protected page
 * body with this: it waits for the session to restore (no auth flicker) and
 * sends unauthenticated visitors to /login.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      void navigate({ to: "/login", replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[60vh] items-center justify-center px-4"
      >
        <p className="font-pixel text-[11px] text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
