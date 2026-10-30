import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="label-mono flex items-center gap-2">
      {index && <span className="text-accent">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({ index, label, title, subtitle, center = false }: { index?: string; label: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center [&_p.label-mono]:justify-center" : ""}`}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.12] text-text sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
