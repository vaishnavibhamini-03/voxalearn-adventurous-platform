import { createFileRoute } from "@tanstack/react-router";
import { FeatureCard } from "@/components/FeatureCard";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — VoxaLearn" },
      {
        name: "description",
        content:
          "Voice-first interaction, gamified learning, immersive game worlds, a friendly companion, accessibility, rewards and personalised learning.",
      },
      { property: "og:title", content: "Features — VoxaLearn" },
      {
        property: "og:description",
        content: "Explore what makes VoxaLearn a pixel-art learning adventure.",
      },
    ],
  }),
  component: FeaturesPage,
});

const FEATURES = [
  {
    icon: "🎤",
    title: "Voice-First Interaction",
    description: "Voice is the primary way to interact with the learning experience.",
  },
  {
    icon: "🎮",
    title: "Gamified Learning",
    description: "Learning concepts are presented through interactive challenges.",
  },
  {
    icon: "🌍",
    title: "Immersive Game Worlds",
    description: "Learning takes place inside engaging game-like environments.",
  },
  {
    icon: "🤖",
    title: "Voxa Learning Companion",
    description: "A friendly digital companion guides the learner along the way.",
  },
  {
    icon: "♿",
    title: "Accessible Interaction",
    description: "The platform supports multiple interaction methods.",
  },
  {
    icon: "🏆",
    title: "Progress & Rewards",
    description: "Students can track their learning journey as it unfolds.",
  },
  {
    icon: "🧠",
    title: "Personalized Learning",
    description: "Learning experiences can adapt to individual students.",
  },
  {
    icon: "🧪",
    title: "Interactive Learning Experiences",
    description: "Practical and simulation-based experiences support deeper learning.",
  },
];

function FeaturesPage() {
  return (
    <>
      <PageHeader
        title="Features"
        subtitle="Everything in VoxaLearn is designed around one idea: learning sticks when it feels like an adventure."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="min-w-0">
              <FeatureCard {...feature} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
