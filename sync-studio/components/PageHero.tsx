import { LogoLines } from "./LogoLines";

/** v2 inner-page hero: path-style breadcrumb, very large title, logo lines in the background. */
export function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <section className="relative -mt-[4.25rem] overflow-hidden pb-12 pt-[8.5rem] sm:pb-16 sm:pt-40">
      <div className="grid-bg" />
      <div className="glow -top-56 start-[10%] h-[460px] w-[460px]" />
      <LogoLines className="absolute -end-[18%] top-[60px] hidden w-[52%] opacity-70 md:block lg:-end-[6%] lg:w-[38%]" />
      <div className="container-x relative">
        <p className="font-mono text-xs tracking-[0.12em] text-muted" dir="ltr">
          <span className="text-accent">~</span> / sync-studio / <span className="text-text">{label.toLowerCase()}</span>
        </p>
        <h1 className="page-title mt-6 max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
