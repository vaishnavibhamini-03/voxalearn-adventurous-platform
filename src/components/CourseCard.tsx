import { Lock, Sparkles } from "lucide-react";

export type Course = {
  name: string;
  category: string;
  description: string;
  available: boolean;
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="pixel-frame group relative flex flex-col gap-3 bg-card/85 p-5 transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-pixel text-[8px] uppercase text-accent">{course.category}</p>
          <h3 className="mt-2 font-pixel text-xs text-card-foreground sm:text-sm">{course.name}</h3>
        </div>
        {course.available ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border-2 border-gold-deep bg-gold px-2 py-1 font-pixel text-[8px] text-gold-foreground">
            <Sparkles className="size-3" aria-hidden />
            Available
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border-2 border-border bg-muted px-2 py-1 font-pixel text-[8px] text-muted-foreground">
            <Lock className="size-3" aria-hidden />
            Locked
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{course.description}</p>
      {!course.available ? (
        <p className="mt-auto font-pixel text-[8px] uppercase text-muted-foreground">
          Sealed by an ancient rune
        </p>
      ) : (
        <p className="mt-auto font-pixel text-[8px] uppercase text-accent">Quest line open</p>
      )}
    </article>
  );
}
