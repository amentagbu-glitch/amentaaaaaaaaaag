import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { JsonData } from "./JsonData";
import { IconCheck } from "../icons";

const NEEDS = ["google", "photo", "whatsapp", "website", "reels", "social", "booking", "ai"] as const;
const PLAN_KEYS = ["starter", "growth", "full"] as const;

/** Package builder: pick needs, see the matching offer (real prices from the offers) and send it. */
export function PackageBuilder() {
  const t = useTranslations("v2.builder");
  const o = useTranslations("offers");
  const locale = useLocale();
  const plans = o.raw("plans") as { name: string; price: string; period: string; desc: string; features: string[] }[];
  const byKey = Object.fromEntries(PLAN_KEYS.map((k, i) => [k, { name: plans[i].name, price: plans[i].price, period: plans[i].period, desc: plans[i].desc }]));
  const data = {
    plans: byKey, needs: Object.fromEntries(NEEDS.map((n) => [n, t(`needs.${n}`)])),
    empty: t("empty"), recommended: t("recommended"), from: t("from"), included: t("included"), onQuote: t("onQuote"),
    sendWhatsapp: t("sendWhatsapp"), requestAudit: t("requestAudit"), note: t("note"), waMessage: t("waMessage"), contactMessage: t("contactMessage"),
    contactPath: getPathname({ href: "/contact", locale }),
  };
  return (
    <div data-builder="builder-data">
      <JsonData id="builder-data" data={data} />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="panel p-6 sm:p-8">
          <p className="label-mono">{t("needsTitle")}</p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {NEEDS.map((n) => (
              <button key={n} type="button" data-need={n} aria-pressed="false" className="need-chip">
                <span className="need-box"><IconCheck className="h-3.5 w-3.5" /></span>
                <span>{t(`needs.${n}`)}</span>
              </button>
            ))}
          </div>
        </div>
        <div data-builder-result aria-live="polite" className="panel builder-result p-6 sm:p-8">
          <p className="builder-empty">{t("empty")}</p>
        </div>
      </div>
      <p className="label-mono mt-12">{t("packagesTitle")}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {PLAN_KEYS.map((k, i) => (
          <article key={k} data-plan-card={k} className="panel plan-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-chrome">{plans[i].name}</h3>
              <span className="plan-flag font-mono text-[10px] uppercase tracking-[0.14em]">{t("recommended")}</span>
            </div>
            <p className="mt-4 text-sm text-muted">{o("from")}</p>
            <p className="font-heading text-3xl font-medium tracking-[-0.03em]">{plans[i].price}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-chrome">{plans[i].period}</p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {plans[i].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-chrome"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted"><span className="h-px w-6 bg-line" /> {o("note")}</p>
    </div>
  );
}
