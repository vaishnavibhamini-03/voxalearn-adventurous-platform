import type { ReactNode } from "react";
import { PageBackground } from "./GameBackground";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b-2 border-border">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 text-center sm:py-24">
        <h1 className="title-gradient font-pixel text-xl leading-relaxed sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
