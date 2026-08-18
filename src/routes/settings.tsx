import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Panel, StudentShell } from "@/components/student/StudentShell";
import { PixelButton, pixelButtonClass } from "@/components/PixelButton";
import { useAuth } from "@/lib/auth";
import { useTheme, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — VoxaLearn" },
      { name: "description", content: "Adjust your VoxaLearn theme, account and accessibility preferences." },
      { property: "og:title", content: "Settings — VoxaLearn" },
      {
        property: "og:description",
        content: "Adjust your VoxaLearn theme, account and accessibility preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const THEME_OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
];

function SettingsPage() {
  const { preference, setPreference } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    void navigate({ to: "/", replace: true });
  }

  return (
    <StudentShell title="Settings" subtitle="Tune how the VoxaLearn world looks and behaves for you.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Theme">
          <div
            role="radiogroup"
            aria-label="Theme preference"
            className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          >
            {THEME_OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={preference === value}
                onClick={() => setPreference(value)}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-2 rounded-md border-2 bg-surface/70 px-3 text-sm font-medium transition-colors",
                  preference === value
                    ? "border-accent bg-primary/15 text-accent"
                    : "border-border text-foreground hover:text-accent",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Your choice is saved on this device and applies across every VoxaLearn page.
          </p>
        </Panel>

        <Panel title="Account">
          <div className="flex flex-wrap gap-3">
            <Link to="/forgot-password" className={pixelButtonClass("outline", "md")}>
              Change Password
            </Link>
            <PixelButton variant="gold" size="md" onClick={handleSignOut} disabled={signingOut}>
              {signingOut ? "Signing out..." : "Logout"}
            </PixelButton>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Changing your password sends a secure reset link to your registered email address.
          </p>
        </Panel>

        <Panel title="Accessibility" className="lg:col-span-2">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              Animations follow your device's reduced-motion setting, so decorative movement is disabled
              automatically when you prefer less motion.
            </li>
            <li>Every control is reachable with a keyboard and shows a visible focus outline.</li>
            <li>Buttons and links use large touch targets for phones and tablets.</li>
            <li>Light and dark themes are both tuned for readable contrast.</li>
          </ul>
        </Panel>
      </div>
    </StudentShell>
  );
}
