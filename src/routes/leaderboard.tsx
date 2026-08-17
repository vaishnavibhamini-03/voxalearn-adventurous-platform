import { createFileRoute } from "@tanstack/react-router";
import { Award, Trophy } from "lucide-react";
import { EmptyState, Panel, SkeletonBlock, StudentShell } from "@/components/student/StudentShell";
import { StudentAvatar } from "@/components/StudentAvatar";
import { useAuth } from "@/lib/auth";
import { useLeaderboard } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — VoxaLearn" },
      {
        name: "description",
        content: "See how VoxaLearn adventurers rank as they earn XP across the learning world.",
      },
      { property: "og:title", content: "Leaderboard — VoxaLearn" },
      {
        property: "og:description",
        content: "Rankings of VoxaLearn adventurers based on XP earned in the learning world.",
      },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { user } = useAuth();
  const { data, isPending, isError } = useLeaderboard();
  const rows = data ?? [];

  return (
    <StudentShell
      title="Leaderboard"
      subtitle="Adventurers ranked by the XP they earn across the VoxaLearn world."
    >
      <Panel title="Rankings">
        {isPending ? (
          <div className="space-y-2">
            <SkeletonBlock className="h-14" />
            <SkeletonBlock className="h-14" />
            <SkeletonBlock className="h-14" />
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">
            Unable to load the leaderboard right now. Please try again.
          </p>
        ) : rows.length === 0 ? (
          <EmptyState>The leaderboard will appear as students begin their learning adventures.</EmptyState>
        ) : (
          <ul className="space-y-2">
            {rows.map((row) => {
              const isSelf = row.user_id === user?.id;
              return (
                <li
                  key={row.user_id}
                  className={cn(
                    "flex items-center gap-3 rounded-md border-2 bg-surface/70 p-3",
                    isSelf ? "border-accent bg-primary/15" : "border-border",
                  )}
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border-2 border-border bg-card/80 font-pixel text-[10px] text-accent">
                    {row.rank}
                  </span>
                  <StudentAvatar avatarId={row.avatar_url} size={40} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-card-foreground">
                      {row.username}
                      {isSelf ? <span className="ml-2 font-pixel text-[8px] text-accent">You</span> : null}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Award className="size-3" aria-hidden />
                      {row.achievement_count} achievements
                    </p>
                  </div>
                  <p className="inline-flex shrink-0 items-center gap-1 font-pixel text-[10px] text-gold">
                    <Trophy className="size-3.5" aria-hidden />
                    {row.xp} XP
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </StudentShell>
  );
}
