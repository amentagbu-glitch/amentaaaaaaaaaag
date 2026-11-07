import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TimelineVisual, SearchVisual, FlowVisual } from "../BentoVisuals";
import { SectionHead } from "./SectionHead";
import { Spot } from "../Spot";
import { IconArrow, IconCheck, IconGlobe, IconSpark, IconVideo } from "../icons";

const PANELS = [
  { k: "content", Icon: IconVideo, Visual: TimelineVisual },
  { k: "digital", Icon: IconGlobe, Visual: SearchVisual },
  { k: "ai", Icon: IconSpark, Visual: FlowVisual },
] as const;

/** Services as big panels. On laptops the row scrolls sideways while the section is pinned (/features.js). */
export function ServicesShowcase() {
  const t = useTranslations("services");
  const v = useTranslations("v2.sections.services");
  return (
    <section id="services" data-hscroll className="hs-section relative">
      <div className="hs-sticky">
        <div className="container-x">
          <SectionHead index="02" label={v("label")} title={v("title")} subtitle={v("subtitle")} />
        </div>
        <div className="container-x mt-10 lg:mt-12">
          <div className="hs-viewport">
            <div data-hscroll-track className="hs-track">
              {PANELS.map(({ k, Icon, Visual }, i) => (
                <article key={k} data-spot className="panel hs-panel group overflow-hidden">
                  <Spot />
                  <div className="relative grid h-full lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                        <span className="font-mono text-xs text-muted" dir="ltr">0{i + 1} / 03</span>
                      </div>
                      <h3 className="mt-8 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">{t(`items.${k}.title`)}</h3>
                      <p className="mt-3 text-lg text-muted">{t(`items.${k}.text`)}</p>
                      <ul className="mt-6 space-y-2.5">
                        {(t.raw(`items.${k}.points`) as string[]).map((p) => (
                          <li key={p} className="flex items-center gap-2.5 text-chrome"><IconCheck className="h-4 w-4 shrink-0 text-primary" /> {p}</li>
                        ))}
                      </ul>
                      <Link href={`/services#${k}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-text hover:text-primary">
                        {t("more")} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                      </Link>
                    </div>
                    <div className="relative min-h-[280px] border-t border-line bg-bg/40 lg:border-s lg:border-t-0">
                      <div className="grid-bg ![mask-image:none] opacity-40" />
                      <Visual />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="hs-progress mt-8 hidden lg:block" aria-hidden><span /></div>
        </div>
      </div>
    </section>
  );
}
