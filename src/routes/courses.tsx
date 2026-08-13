import { createFileRoute } from "@tanstack/react-router";
import { CourseCard, type Course } from "@/components/CourseCard";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Explore Courses — VoxaLearn" },
      {
        name: "description",
        content:
          "Browse the VoxaLearn course catalog across programming, mathematics, science and English. Python is open to explore now.",
      },
      { property: "og:title", content: "Explore Courses — VoxaLearn" },
      {
        property: "og:description",
        content: "Programming, mathematics, science and English quest lines inside the VoxaLearn world.",
      },
    ],
  }),
  component: CoursesPage,
});

const CATEGORIES: { name: string; courses: Course[] }[] = [
  {
    name: "Programming",
    courses: [
      {
        name: "Python",
        category: "Programming",
        description: "Begin your journey with the language of automation, data and problem solving.",
        available: true,
      },
      {
        name: "C",
        category: "Programming",
        description: "Master memory, pointers and the foundations that power everything else.",
        available: false,
      },
      {
        name: "C++",
        category: "Programming",
        description: "Build on C with objects, templates and high-performance structures.",
        available: false,
      },
      {
        name: "Java",
        category: "Programming",
        description: "Explore object-oriented design and the tooling of large systems.",
        available: false,
      },
    ],
  },
  {
    name: "Mathematics",
    courses: [
      {
        name: "Mathematics",
        category: "Mathematics",
        description: "Sharpen reasoning through algebra, geometry and applied problem solving.",
        available: false,
      },
    ],
  },
  {
    name: "Science",
    courses: [
      {
        name: "Chemistry",
        category: "Science",
        description: "Reactions, elements and the rules that shape matter itself.",
        available: false,
      },
      {
        name: "Physics",
        category: "Science",
        description: "Motion, energy and forces explored through hands-on challenges.",
        available: false,
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
      },
      {
        name: "Communication",
        category: "English",
        description: "Speak with confidence, listen closely and express ideas clearly.",
        available: false,
      },
    ],
  },
];

function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Explore Courses"
        subtitle="Each course is a quest line inside the VoxaLearn world. Open paths can be explored today; sealed paths await their rune."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        {CATEGORIES.map((category) => (
          <section key={category.name} className="mb-14 last:mb-0">
            <h2 className="font-pixel text-xs text-foreground sm:text-sm">{category.name}</h2>
            <div className="mt-2 h-0.5 w-16 bg-accent" />
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.courses.map((course) => (
                <li key={course.name} className="min-w-0">
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
