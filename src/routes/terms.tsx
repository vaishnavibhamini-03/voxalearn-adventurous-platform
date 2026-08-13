import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — VoxaLearn" },
      {
        name: "description",
        content: "The terms that apply when you use the VoxaLearn learning platform.",
      },
      { property: "og:title", content: "Terms of Service — VoxaLearn" },
      { property: "og:description", content: "The terms that apply when you use VoxaLearn." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Using VoxaLearn",
    body: "VoxaLearn is provided for learning and skill development. Keep your account details private and use the platform respectfully.",
  },
  {
    title: "Your account",
    body: "You are responsible for the activity that happens under your account, including the accuracy of the details you provide.",
  },
  {
    title: "Content",
    body: "Course material, artwork and the VoxaLearn name belong to VoxaLearn and may not be redistributed without permission.",
  },
  {
    title: "Changes",
    body: "These terms may be updated as the platform grows. Continued use of VoxaLearn means you accept the current version.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="The ground rules for exploring the VoxaLearn world."
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:py-20">
        <div className="grid gap-6">
          {SECTIONS.map((s) => (
            <article key={s.title} className="pixel-frame bg-card/85 p-6">
              <h2 className="font-pixel text-[11px] text-card-foreground">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
