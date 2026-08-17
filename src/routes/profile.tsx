import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Panel, SkeletonBlock, StudentShell } from "@/components/student/StudentShell";
import { AVATAR_PRESETS, StudentAvatar } from "@/components/StudentAvatar";
import { FormAlert } from "@/components/FormAlert";
import { FormInput } from "@/components/FormInput";
import { PixelButton, pixelButtonClass } from "@/components/PixelButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { checkUsernameAvailable } from "@/lib/auth.functions";
import { useInvalidateStudent, useStudentProfile } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — VoxaLearn" },
      { name: "description", content: "View and update your VoxaLearn adventurer profile." },
      { property: "og:title", content: "Your Profile — VoxaLearn" },
      { property: "og:description", content: "View and update your VoxaLearn adventurer profile." },
    ],
  }),
  component: ProfilePage,
});

type Errors = Partial<Record<"fullName" | "username", string>>;

function ProfilePage() {
  const { user } = useAuth();
  const { data: profile, isPending, isError } = useStudentProfile();
  const invalidate = useInvalidateStudent();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarId, setAvatarId] = useState<string>("spark");
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name);
    setUsername(profile.username);
    setAvatarId(profile.avatar_url ?? "spark");
  }, [profile]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !user) return;

    const next: Errors = {};
    const name = fullName.trim();
    const handle = username.trim();
    if (name.length < 2 || name.length > 60) next.fullName = "Please enter your full name (2-60 characters).";
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(handle))
      next.username = "Please enter a valid username (3-20 letters, numbers or underscores).";
    setErrors(next);
    setStatus(null);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      if (handle.toLowerCase() !== (profile?.username ?? "").toLowerCase()) {
        const availability = await checkUsernameAvailable({ data: { username: handle } });
        if (!availability.available) {
          setErrors({ username: "Username is already taken." });
          setSaving(false);
          return;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name, username: handle, avatar_url: avatarId })
        .eq("id", user.id);

      if (error) {
        setStatus({ tone: "error", text: "Unable to save your changes. Please try again." });
      } else {
        await invalidate();
        setStatus({ tone: "success", text: "Your profile has been updated." });
      }
    } catch {
      setStatus({ tone: "error", text: "Unable to save your changes. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  const created = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <StudentShell title="Your Profile" subtitle="Your adventurer identity inside the VoxaLearn world.">
      {isError ? (
        <Panel>
          <p className="text-sm text-destructive">Unable to load your profile. Please try again.</p>
        </Panel>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <Panel title="Adventurer" className="text-center">
            {isPending ? (
              <SkeletonBlock className="mx-auto h-24 w-24" />
            ) : (
              <>
                <StudentAvatar avatarId={avatarId} size={96} className="mx-auto" />
                <p className="mt-4 truncate font-pixel text-xs text-card-foreground">{profile?.username}</p>
                <p className="mt-2 truncate text-sm text-muted-foreground">{profile?.full_name}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{profile?.email}</p>
                <p className="mt-3 font-pixel text-[8px] uppercase text-muted-foreground">
                  Joined {created}
                </p>
                <p className="mt-2 font-pixel text-[10px] text-gold">{profile?.xp ?? 0} XP</p>
              </>
            )}
          </Panel>

          <Panel title="Edit Profile">
            {isPending ? (
              <div className="space-y-3">
                <SkeletonBlock className="h-12" />
                <SkeletonBlock className="h-12" />
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                {status ? <FormAlert tone={status.tone}>{status.text}</FormAlert> : null}

                <FormInput
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((p) => ({ ...p, fullName: undefined }));
                  }}
                  error={errors.fullName}
                  autoComplete="name"
                  maxLength={60}
                />

                <FormInput
                  label="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors((p) => ({ ...p, username: undefined }));
                  }}
                  error={errors.username}
                  autoComplete="username"
                  maxLength={20}
                  hint="3-20 letters, numbers or underscores."
                />

                <FormInput
                  label="Email"
                  value={profile?.email ?? ""}
                  readOnly
                  disabled
                  hint="Your email is linked to your sign-in and cannot be changed here."
                />

                <fieldset className="min-w-0">
                  <legend className="mb-2 block text-sm font-medium text-foreground">Avatar</legend>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        aria-pressed={avatarId === preset.id}
                        aria-label={`Choose the ${preset.label} avatar`}
                        onClick={() => setAvatarId(preset.id)}
                        className={cn(
                          "rounded-md border-2 p-1 transition-colors",
                          avatarId === preset.id ? "border-accent bg-primary/15" : "border-transparent",
                        )}
                      >
                        <StudentAvatar avatarId={preset.id} size={48} />
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-wrap gap-3 pt-1">
                  <PixelButton type="submit" variant="gold" size="md" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </PixelButton>
                  <Link to="/dashboard" className={pixelButtonClass("outline", "md")}>
                    Back to Dashboard
                  </Link>
                </div>
              </form>
            )}
          </Panel>
        </div>
      )}
    </StudentShell>
  );
}
