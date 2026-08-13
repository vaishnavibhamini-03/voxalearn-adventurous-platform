import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — VoxaLearn" },
      {
        name: "description",
        content: "How VoxaLearn handles learner information, preferences and account details.",
      },
      { property: "og:title", content: "Privacy Policy — VoxaLearn" },
      { property: "og:description", content: "How VoxaLearn handles learner information." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "Information we handle",
    body: "VoxaLearn works with the details needed to run a learning account: the name you provide, your email address, your username and the learning preferences you choose inside the platform.",
  },
  {
    title: "How information is used",
    body: "Information is used to give you access to your account, remember your interface preferences such as theme, and present your learning journey back to you.",
  },
  {
    title: "Your choices",
    body: "You can update the details on your account at any time, and you can request that your account and its associated information be removed.",
  },
  {
    title: "Questions",
    body: "If anything here is unclear, use the contact form and the VoxaLearn team will respond.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="A short, plain-language summary of how VoxaLearn treats learner information."
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
