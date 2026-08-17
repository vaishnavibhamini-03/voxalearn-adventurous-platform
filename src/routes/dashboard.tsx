import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Gift, Layers, Sparkles, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EmptyState, Panel, SkeletonBlock, StudentShell } from "@/components/student/StudentShell";
import { StudentAvatar } from "@/components/StudentAvatar";
import { VoxaMascot } from "@/components/VoxaMascot";
import { pixelButtonClass } from "@/components/PixelButton";
import {
  useStudentAchievements,
  useStudentProfile,
  useStudentProgress,
  useStudentRewards,
} from "@/lib/student-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — VoxaLearn" },
      {
        name: "description",
        content: "Track your XP, progress, rewards and achievements inside the VoxaLearn world.",
      },
      { property: "og:title", content: "Student Dashboard — VoxaLearn" },
      {
        property: "og:description",
        content: "Your personal VoxaLearn HUD: XP, progress, rewards and achievements.",
      },
    ],
  }),
  component: DashboardPage,
});

function StatCard({
  label,
  value,
  Icon,
  loading,
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
  loading: boolean;
}) {
  return (
    <div className="pixel-frame flex items-center gap-3 bg-card/85 p-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border-2 border-accent/50 bg-primary/15">
        <Icon className="size-5 text-accent" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-pixel text-[8px] uppercase text-muted-foreground">{label}</p>
        {loading ? (
          <SkeletonBlock className="mt-2 h-5 w-16" />
        ) : (
          <p className="mt-1 font-pixel text-sm text-card-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function DashboardPage() {
  const profileQuery = useStudentProfile();
  const progressQuery = useStudentProgress();
  const rewardsQuery = useStudentRewards();
  const achievementsQuery = useStudentAchievements();

  const profile = profileQuery.data;
  const progress = progressQuery.data;
  const rewards = rewardsQuery.data ?? [];
  const achievements = achievementsQuery.data ?? [];

  const loading = profileQuery.isPending || progressQuery.isPending;
  const failed = profileQuery.isError || progressQuery.isError;

  const username = profile?.username ?? "Adventurer";
  const overall = progress?.overall_progress ?? 0;

  return (
    <StudentShell
      title={loading ? "Welcome back!" : `Welcome back, ${username}!`}
      subtitle="Ready for your next learning adventure?"
    >
      {failed ? (
        <Panel className="mb-6">
          <p className="text-sm text-destructive">
            Unable to load your dashboard right now. Please refresh and try again.
          </p>
        </Panel>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 space-y-6">
          <Panel className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <StudentAvatar avatarId={profile?.avatar_url} size={56} />
              <div className="min-w-0">
                <p className="truncate font-pixel text-xs text-card-foreground sm:text-sm">{username}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your adventure continues in the VoxaLearn world.
                </p>
              </div>
            </div>
            <Link to="/my-courses" className={pixelButtonClass("gold", "md")}>
              Continue Learning
            </Link>
          </Panel>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="XP Points" value={`${profile?.xp ?? 0} XP`} Icon={Sparkles} loading={loading} />
            <StatCard label="Rewards" value={`${rewards.length}`} Icon={Gift} loading={rewardsQuery.isPending} />
            <StatCard
              label="Achievements"
              value={`${achievements.length}`}
              Icon={Award}
              loading={achievementsQuery.isPending}
            />
            <StatCard
              label="Levels Completed"
              value={`${progress?.levels_completed ?? 0}`}
              Icon={Layers}
              loading={loading}
            />
            <StatCard label="Overall Progress" value={`${overall}%`} Icon={TrendingUp} loading={loading} />
          </div>

          <Panel title="Learning Overview">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Overall progress</p>
              <p className="font-pixel text-[11px] text-accent">{overall}%</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={overall}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall learning progress"
              className="mt-2 h-4 w-full overflow-hidden rounded-md border-2 border-border bg-surface/80"
            >
              <div
                className="h-full bg-gold transition-[width] duration-500"
                style={{ width: `${Math.min(Math.max(overall, 0), 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your journey starts in the Python world. Progress will grow as you complete challenges.
            </p>
          </Panel>

          <Panel title="Recent Learning">
            <EmptyState>No learning activity yet. Open a course to begin your first quest.</EmptyState>
          </Panel>
        </div>

        <aside className="min-w-0 space-y-6">
          <Panel className="flex flex-col items-center text-center">
            <VoxaMascot size={104} bubbleSide="top" message="Welcome back! Your adventure continues." />
          </Panel>

          <Panel title="Rewards">
            {rewardsQuery.isPending ? (
              <SkeletonBlock className="h-12" />
            ) : rewards.length === 0 ? (
              <EmptyState>No rewards yet.</EmptyState>
            ) : (
              <ul className="space-y-2">
                {rewards.map((r) => (
                  <li key={r.id} className="rounded-md border-2 border-border bg-surface/70 p-3 text-sm">
                    <p className="font-medium text-card-foreground">{r.reward_name}</p>
                    {r.description ? (
                      <p className="mt-1 text-muted-foreground">{r.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Achievements">
            {achievementsQuery.isPending ? (
              <SkeletonBlock className="h-12" />
            ) : achievements.length === 0 ? (
              <EmptyState>No achievements yet.</EmptyState>
            ) : (
              <ul className="space-y-2">
                {achievements.map((a) => (
                  <li key={a.id} className="rounded-md border-2 border-border bg-surface/70 p-3 text-sm">
                    <p className="font-medium text-card-foreground">{a.achievement_name}</p>
                    {a.description ? (
                      <p className="mt-1 text-muted-foreground">{a.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </aside>
      </div>
    </StudentShell>
  );
}
