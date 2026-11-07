import { useLocale, useTranslations } from "next-intl";
import { detailFormats, intentKeywords, langMarkers, replies } from "@/lib/aiDemo";
import { JsonData } from "./JsonData";
import { IconCheck, IconSpark } from "../icons";

/** Live WhatsApp AI demo for a fictional café. The bot itself runs in /features.js. */
export function AiDemo() {
  const t = useTranslations("v2.ai");
  const locale = useLocale();
  const data = {
    locale, keywords: intentKeywords, markers: langMarkers, replies, formats: detailFormats,
    intents: t.raw("intents"), langs: t.raw("langs"), actions: t.raw("actions"), waiting: t("waiting"),
  };
  const welcome = replies[locale === "en" ? "en" : locale === "ar" ? "ar" : "fr"].greet;
  const rows: { k: string; label: string; init: string }[] = [
    { k: "intent", label: t("labels.intent"), init: "—" },
    { k: "lang", label: t("labels.lang"), init: "—" },
    { k: "details", label: t("labels.details"), init: "—" },
    { k: "action", label: t("labels.action"), init: t("waiting") },
    { k: "time", label: t("labels.time"), init: "—" },
  ];
  return (
    <div data-ai="ai-data" className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <JsonData id="ai-data" data={data} />
      <div className="panel ai-chat flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated font-heading text-sm font-semibold text-chrome">CA</span>
          <div className="min-w-0">
            <p className="font-medium text-text">{t("business")}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-wa" /> {t("status")}</p>
          </div>
          <span className="ms-auto rounded-full border border-dashed border-line-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{t("demoBadge")}</span>
        </div>
        <ul data-ai-log data-lenis-prevent className="ai-log flex-1 space-y-2.5 overflow-y-auto px-4 py-5" aria-live="polite">
          <li className="ai-msg ai-in ai-welcome">
            <div className="ai-bubble"><p dir="auto">{welcome}</p><span className="ai-time">{t("tag")}</span></div>
          </li>
        </ul>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]" data-lenis-prevent>
          {(t.raw("suggestions") as string[]).map((s) => (
            <button key={s} type="button" data-ai-suggest dir="auto" className="shrink-0 rounded-full border border-line bg-bg/50 px-3.5 py-2 text-sm text-chrome transition-colors hover:border-primary hover:text-text">
              {s}
            </button>
          ))}
        </div>
        <form data-ai-form className="flex items-center gap-2 border-t border-line p-3">
          <label htmlFor="ai-input" className="sr-only">{t("placeholder")}</label>
          <input id="ai-input" data-ai-input type="text" dir="auto" autoComplete="off" maxLength={240} placeholder={t("placeholder")} className="field !min-h-11 flex-1 !rounded-full" />
          <button type="submit" aria-label={t("send")} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover">
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="currentColor" aria-hidden><path d="M3.4 20.4l17.3-7.5a1 1 0 000-1.8L3.4 3.6a1 1 0 00-1.4 1.1L4 11l9 1-9 1-2 6.3a1 1 0 001.4 1.1z" /></svg>
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <div className="panel scanline relative overflow-hidden p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-chrome"><IconSpark className="h-4 w-4 text-primary" /> {t("panelTitle")}</p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent"><span className="live-dot !h-1.5 !w-1.5" /> live</span>
          </div>
          <dl className="mt-5 space-y-2 font-mono text-[13px]">
            {rows.map((r) => (
              <div key={r.k} className="flex items-baseline justify-between gap-4 border-t border-line/60 pt-2">
                <dt className="text-muted">→ {r.label}</dt>
                <dd data-ai-field={r.k} className="text-end text-text" dir="auto">{r.init}</dd>
              </div>
            ))}
          </dl>
          <button type="button" data-ai-reset className="mt-5 text-xs text-muted underline-offset-4 hover:text-text hover:underline">{t("reset")}</button>
        </div>
        <div className="panel p-5 sm:p-6">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {t("disclaimer")}</p>
        </div>
      </div>
    </div>
  );
}
