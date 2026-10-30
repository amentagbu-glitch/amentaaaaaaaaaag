import { useTranslations } from "next-intl";
import { Spot } from "./Spot";

export type Case = { type: string; problem: string; solution: string; result: string };

export function CaseCard({ c, index, detailed = false }: { c: Case; index: number; detailed?: boolean }) {
  const t = useTranslations("work");
  return (
    <article data-spot className="glass hud lift flex h-full flex-col overflow-hidden">
      <Spot />
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line bg-bg/50">
        <div className="grid-bg ![mask-image:none] opacity-60" />
        <span className="absolute inset-[18%] border border-dashed border-line" />
        <span className="relative label-mono">{t("visual")}</span>
        <span className="absolute start-3 top-3 rounded-full border border-dashed border-chrome/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-chrome">
          {t("placeholder")} 0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {detailed && <p className="label-mono">{t("typeLabel")}</p>}
        <h3 className={`${detailed ? "mt-1.5" : ""} text-lg font-semibold`}>{c.type}</h3>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="label-mono">{t("problemLabel")}</dt>
            <dd className="mt-1 leading-relaxed text-chrome">{c.problem}</dd>
          </div>
          <div>
            <dt className="label-mono">{detailed ? t("doneLabel") : t("solutionLabel")}</dt>
            <dd className="mt-1 leading-relaxed text-chrome">{c.solution}</dd>
          </div>
          <div className="mt-auto border-t border-line pt-4">
            <dt className="label-mono">{t("resultLabel")}</dt>
            <dd className="mt-1 font-mono text-accent">{c.result}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
