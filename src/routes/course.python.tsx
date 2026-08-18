import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { EmptyState, Panel, StudentShell } from "@/components/student/StudentShell";
import { VoxaMascot } from "@/components/VoxaMascot";
import { pixelButtonClass } from "@/components/PixelButton";
import { useStudentProgress } from "@/lib/student-data";

export const Route = createFileRoute("/course/python")({
  head: () => ({
    meta: [
      { title: "Python World — VoxaLearn" },
      {
        name: "description",
        content: "Your Python quest line inside VoxaLearn: track progress and prepare for the journey ahead.",
      },
      { property: "og:title", content: "Python World — VoxaLearn" },
      {
        property: "og:description",
        content: "Enter the Python world of VoxaLearn and follow your learning quest line.",
      },
    ],
  }),
  component: PythonCoursePage,
});

function PythonCoursePage() {
  const { data: progress } = useStudentProgress();
  const percent = progress?.overall_progress ?? 0;

  return (
    <StudentShell
      title="Python World"
      subtitle="The gateway to automation, data and problem solving."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <Panel className="flex flex-wrap items-center gap-4">
            <span className="inline-flex size-14 items-center justify-center rounded-md border-2 border-accent/50 bg-primary/15">
              <Terminal className="size-7 text-accent" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-pixel text-xs text-card-foreground sm:text-sm">Python</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your quest line is open. Progress will grow as you complete challenges here.
              </p>
            </div>
            <p className="font-pixel text-[11px] text-accent">{percent}%</p>
          </Panel>

          <Panel title="Course Overview">
            <div
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Python course progress"
              className="h-4 w-full overflow-hidden rounded-md border-2 border-border bg-surface/80"
            >
              <div className="h-full bg-gold" style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your Python journey is being prepared by the guild. Your progress and XP are already being
              tracked, so nothing you earn will be lost.
            </p>
          </Panel>

          <Panel title="Your Quests">
            <EmptyState>No quests started yet.</EmptyState>
            <div className="mt-4">
              <Link to="/my-courses" className={pixelButtonClass("outline", "md")}>
                Back to My Courses
              </Link>
            </div>
          </Panel>
        </div>

        <aside>
          <Panel className="flex flex-col items-center text-center">
            <VoxaMascot size={104} bubbleSide="top" message="Python is a great place to begin!" />
          </Panel>
        </aside>
      </div>
    </StudentShell>
  );
}
