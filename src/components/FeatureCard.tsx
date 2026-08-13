export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="pixel-frame flex flex-col gap-3 bg-card/85 p-5 transition-transform duration-200 hover:-translate-y-1">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <h3 className="font-pixel text-[11px] leading-relaxed text-card-foreground sm:text-xs">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </article>
  );
}
