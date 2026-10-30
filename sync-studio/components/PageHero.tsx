import { Reveal } from "./Reveal";
import { SectionLabel } from "./Section";

export function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-14 sm:pb-14 sm:pt-20">
      <div className="glow -top-56 start-[10%] h-[460px] w-[460px]" />
      <div className="container-x relative max-w-[1180px]">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.06] sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
