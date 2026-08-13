import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { VoxaMascot } from "@/components/VoxaMascot";
import { PixelLinkButton } from "@/components/PixelButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VoxaLearn — A gamified learning world" },
      {
        name: "description",
        content:
          "VoxaLearn is a gamified learning platform that makes skill building interactive, engaging, accessible and enjoyable.",
      },
      { property: "og:title", content: "About VoxaLearn" },
      {
        property: "og:description",
        content: "Discover how VoxaLearn makes skill building interactive, engaging and enjoyable.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    title: "Interactive",
    body: "Every concept is something you do — not something you passively read through.",
  },
  {
    title: "Engaging",
    body: "Quests, challenges and game worlds keep attention where it matters: on the learning.",
  },
  {
    title: "Accessible",
    body: "Mouse, keyboard and touch are all first-class ways to move through the world.",
  },
  {
    title: "Enjoyable",
    body: "A crafted pixel-art atmosphere makes practice feel like play instead of homework.",
  },
  {
    title: "Skill-Oriented",
    body: "Content is organised around practical skills that carry into real study and work.",
  },
  {
    title: "Guided",
    body: "Voxa, your companion, keeps you oriented as you explore new territory.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        title="About VoxaLearn"
        subtitle="VoxaLearn is a gamified learning platform built for the skill ecosystem — a world where curiosity is rewarded, progress feels tangible, and learning happens inside an adventure rather than a textbook."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 className="font-pixel text-sm text-foreground sm:text-base">Our world, our purpose</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Traditional learning tools ask students to sit still and absorb. VoxaLearn asks them to
              explore. Lessons are framed as journeys through floating islands, ancient libraries and
              glowing laboratories, where each new skill unlocks another part of the map.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The result is a platform that respects the learner's attention: clear structure, immediate
              feedback, and a sense of momentum that carries from one session to the next.
            </p>
            <div className="mt-8">
              <PixelLinkButton to="/courses" variant="gold" size="md">
                Explore Courses
              </PixelLinkButton>
            </div>
          </div>

          <div className="pixel-frame flex flex-col items-center gap-4 bg-card/80 p-6">
            <VoxaMascot size={140} bubbleSide="top" message="I'll guide you through the world!" />
            <p className="text-center text-sm text-muted-foreground">
              Voxa is the friendly companion of the VoxaLearn world — always nearby, always encouraging.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <li key={p.title} className="pixel-frame bg-card/85 p-5">
              <h3 className="font-pixel text-[11px] text-card-foreground">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
