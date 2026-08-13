import heroChar from "@/assets/hero-char.png";
import { GameBackground } from "./GameBackground";
import { PixelLinkButton } from "./PixelButton";
import { VoxaMascot } from "./VoxaMascot";
import { useAuth } from "@/lib/auth";

export function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden">
      <GameBackground priority />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="title-gradient text-glow font-pixel text-3xl leading-tight sm:text-5xl lg:text-6xl">
            VOXALEARN
          </h1>
          <p className="mt-5 font-pixel text-[10px] leading-relaxed text-accent sm:text-sm">
            Learn Smarter. Speak Freely. Grow Faster.
          </p>
          <p className="mx-auto mt-5 max-w-xl rounded-md p-3 text-sm leading-relaxed text-hero-fg sm:text-base">
            Turn learning into an interactive adventure with engaging challenges, immersive game worlds,
            and intelligent guidance.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
            <PixelLinkButton
              to={isAuthenticated ? "/courses" : "/login"}
              variant="gold"
              size="lg"
              className="w-full max-w-xs"
            >
              Start Learning
            </PixelLinkButton>
            <PixelLinkButton to="/courses" variant="outline" size="md" className="w-full max-w-xs">
              Explore Courses
            </PixelLinkButton>
          </div>
        </div>
      </div>

      {/* Adventurer — decorative, hidden on the smallest screens */}
      <img
        src={heroChar}
        alt=""
        aria-hidden
        loading="lazy"
        className="animate-float-slow pointer-events-none absolute bottom-6 left-2 z-10 hidden w-24 sm:block lg:w-32"
      />

      {/* Voxa mascot */}
      <div className="absolute right-3 bottom-4 z-10 sm:right-6 sm:bottom-8">
        <VoxaMascot size={96} bubbleSide="left" className="sm:hidden" />
        <VoxaMascot size={132} bubbleSide="left" className="hidden sm:flex" />
      </div>
    </section>
  );
}
