import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoxaLearn — Learn Smarter. Speak Freely. Grow Faster." },
      {
        name: "description",
        content:
          "Step into VoxaLearn, a pixel-art learning world with interactive challenges, immersive game environments and a friendly companion named Voxa.",
      },
      { property: "og:title", content: "VoxaLearn — A pixel-art learning adventure" },
      {
        property: "og:description",
        content: "Turn learning into an interactive adventure with challenges and immersive game worlds.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Hero />;
}
