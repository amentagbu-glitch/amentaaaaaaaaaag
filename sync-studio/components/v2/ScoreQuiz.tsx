import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { JsonData } from "./JsonData";
import { Spot } from "../Spot";
import { IconArrow, IconChart } from "../icons";

/** Visibility score quiz. Static intro here; /features.js runs the questions and the result. */
export function ScoreQuiz() {
  const t = useTranslations("v2.quiz");
  const b = useTranslations("v2.builder.needs");
  const f = useTranslations("form.needsOptions");
  const locale = useLocale();
  const questions = t.raw("questions") as { area: string; q: string }[];
  const data = {
    question: t("question"), of: t("of"), back: t("back"), restart: t("restart"),
    answers: t.raw("answers"), questions, resultLabel: t("resultLabel"),
    levels: t.raw("levels"), levelText: t.raw("levelText"), tipsTitle: t("tipsTitle"), tips: t.raw("tips"), allGood: t("allGood"),
    ctaAudit: t("ctaAudit"), ctaWhatsapp: t("ctaWhatsapp"), note: t("note"), waMessage: t("waMessage"), contactMessage: t("contactMessage"),
    areaNames: { google: b("google"), social: b("social"), whatsapp: b("whatsapp"), website: b("website"), booking: b("booking"), video: f("video") },
    contactPath: getPathname({ href: "/contact", locale }),
  };
  return (
    <div data-quiz="quiz-data" data-spot className="panel quiz relative overflow-hidden p-6 sm:p-10">
      <Spot />
      <JsonData id="quiz-data" data={data} />
      <div data-quiz-stage className="relative" aria-live="polite">
        <div className="flex flex-col items-start gap-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
            <IconChart className="h-6 w-6" />
          </span>
          <ol className="grid w-full gap-2 sm:grid-cols-2">
            {questions.map((q, i) => (
              <li key={q.area} className="flex items-start gap-3 rounded-2xl border border-line/70 bg-bg/40 px-4 py-3 text-sm text-chrome">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span>{q.q}</span>
              </li>
            ))}
          </ol>
          <button type="button" data-q-start data-magnetic className="btn btn-primary btn-pill">
            {t("start")} <span className="btn-arrow"><IconArrow className="h-4 w-4 rtl:-scale-x-100" /></span>
          </button>
        </div>
      </div>
    </div>
  );
}
