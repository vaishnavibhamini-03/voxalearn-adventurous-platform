import { createFileRoute, Link } from "@tanstack/react-router";
import { Atom, Beaker, Binary, Braces, Calculator, Coffee, Lock, MessageCircle, PenLine, Sparkles, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Panel, StudentShell } from "@/components/student/StudentShell";
import { pixelButtonClass } from "@/components/PixelButton";

export const Route = createFileRoute("/my-courses")({
  head: () => ({
    meta: [
      { title: "My Courses — VoxaLearn" },
      {
        name: "description",
        content: "Your VoxaLearn course catalog across programming, mathematics, science and English.",
      },
      { property: "og:title", content: "My Courses — VoxaLearn" },
      {
        property: "og:description",
        content: "Enter the Python world and see the quest lines waiting across the VoxaLearn map.",
      },
    ],
  }),
  component: MyCoursesPage,
});

type CourseItem = {
  name: string;
  category: string;
  description: string;
  available: boolean;
  Icon: LucideIcon;
};

const CATEGORIES: { name: string; courses: CourseItem[] }[] = [
  {
    name: "Programming",
    courses: [
      {
        name: "Python",
        category: "Programming",
        description: "Begin your journey with the language of automation, data and problem solving.",
        available: true,
        Icon: Terminal,
      },
      {
        name: "C",
        category: "Programming",
        description: "Memory, pointers and the foundations that power everything else.",
        available: false,
        Icon: Binary,
      },
      {
        name: "C++",
        category: "Programming",
        description: "Objects, templates and high-performance structures.",
        available: false,
        Icon: Braces,
      },
      {
        name: "Java",
        category: "Programming",
        description: "Object-oriented design and the tooling of large systems.",
        available: false,
        Icon: Coffee,
      },
    ],
  },
  {
    name: "Mathematics",
    courses: [
      {
        name: "Mathematics",
        category: "Mathematics",
        description: "Algebra, geometry and applied problem solving.",
        available: false,
        Icon: Calculator,
      },
    ],
  },
  {
    name: "Science",
    courses: [
      {
        name: "Chemistry",
        category: "Science",
        description: "Reactions, elements and the rules that shape matter.",
        available: false,
        Icon: Beaker,
      },
      {
        name: "Physics",
        category: "Science",
        description: "Motion, energy and forces explored through challenges.",
        available: false,
        Icon: Atom,
      },
    ],
  },
  {
    name: "English",
    courses: [
      {
        name: "Grammar",
        category: "English",
        description: "Structure, clarity and precision in written language.",
        available: false,
        Icon: PenLine,
      },
      {
        name: "Communication",
        category: "English",
        description: "Speak with confidence and express ideas clearly.",
        available: false,
        Icon: MessageCircle,
      },
    ],
  },
];

function CourseTile({ course }: { course: CourseItem }) {
  const [showLocked, setShowLocked] = useState(false);
  const Icon = course.Icon;

  return (
    <article
      className={
        course.available
          ? "pixel-frame relative flex flex-col gap-3 bg-gradient-to-br from-primary/20 to-card/90 p-5 shadow-[0_0_24px_-12px_var(--glow)]"
          : "pixel-frame relative flex flex-col gap-3 bg-card/70 p-5"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border-2 border-accent/50 bg-surface/80">
          <Icon className={course.available ? "size-5 text-accent" : "size-5 text-muted-foreground"} aria-hidden />
        </span>
        {course.available ? (
          <span className="inline-flex items-center gap-1 rounded-md border-2 border-gold-deep bg-gold px-2 py-1 font-pixel text-[8px] text-gold-foreground">
            <Sparkles className="size-3" aria-hidden />
            Available
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md border-2 border-border bg-muted px-2 py-1 font-pixel text-[8px] text-muted-foreground">
            <Lock className="size-3" aria-hidden />
            Locked
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="font-pixel text-[8px] uppercase text-accent">{course.category}</p>
        <h3 className="mt-2 font-pixel text-xs text-card-foreground sm:text-sm">{course.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{course.description}</p>

      <p className="font-pixel text-[8px] uppercase text-muted-foreground">
        Progress: {course.available ? "0%" : "Locked"}
      </p>

      {course.available ? (
        <Link to="/course/python" className={pixelButtonClass("gold", "sm", "mt-auto w-full")}>
          Enter Python World
        </Link>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setShowLocked((v) => !v)}
            aria-expanded={showLocked}
            className={pixelButtonClass("outline", "sm", "mt-auto w-full")}
          >
            Locked
          </button>
          {showLocked ? (
            <p role="status" className="rounded-md border-2 border-dashed border-border/70 p-3 text-sm text-muted-foreground">
              This path is sealed by an ancient rune. Keep adventuring to break the seal.
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}

function MyCoursesPage() {
  return (
    <StudentShell
      title="My Courses"
      subtitle="Each course is a quest line inside the VoxaLearn world. Open paths can be explored today."
    >
      <div className="space-y-8">
        {CATEGORIES.map((category) => (
          <Panel key={category.name} title={category.name}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {category.courses.map((course) => (
                <CourseTile key={course.name} course={course} />
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </StudentShell>
  );
}
