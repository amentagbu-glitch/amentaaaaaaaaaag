import { useTranslations } from "next-intl";
import { IconCalendar, IconCheck, IconClock, IconGlobe, IconPhone, IconPin, IconPlay, IconSpark, IconStar, IconWhatsApp } from "./icons";

const WAVE = [5, 9, 14, 8, 18, 12, 6, 15, 20, 11, 7, 16, 10, 19, 13, 6, 12, 17, 9, 14, 8, 18, 11, 6, 15, 10, 20, 12, 7, 16, 9, 13];

/** Content: a short-form editing timeline with a moving playhead. */
export function TimelineVisual() {
  const t = useTranslations("bento");
  const captions = t.raw("captions") as string[];
  return (
    <div className="absolute inset-0 flex gap-4 p-5" aria-hidden>
      <div className="relative hidden w-[92px] shrink-0 overflow-hidden rounded-[12px] border border-line bg-surface sm:block">
        <svg viewBox="0 0 90 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="90" height="160"  style={{ fill: "var(--color-surface)" }}/>
          <rect y="96" width="90" height="64"  style={{ fill: "var(--color-surface-2)" }}/>
          <ellipse cx="45" cy="104" rx="30" ry="7"  style={{ fill: "var(--color-elevated)" }}/>
          <path d="M24 102 Q45 52 66 102z"  style={{ fill: "var(--color-elevated)", stroke: "var(--color-line)" }}/>
          <circle cx="45" cy="56" r="2.5"  style={{ fill: "var(--color-chrome)" }}/>
        </svg>
        <span className="absolute start-2 top-2 flex items-center gap-1 font-mono text-[8px] text-chrome" dir="ltr">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d5e]" /> 9:16
        </span>
        <span className="absolute inset-x-2 bottom-2 rounded bg-bg/70 px-1 py-0.5 text-center text-[8px] text-text">{captions[0]}</span>
        <span className="absolute start-1/2 top-[38%] flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-bg/60 text-text rtl:translate-x-1/2">
          <IconPlay className="h-3 w-3" />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center" dir="ltr">
        <div className="mb-2 flex justify-between ps-9 font-mono text-[9px] text-muted">
          <span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span>
        </div>
        <div className="relative space-y-2">
          <Track label="V1">
            <div className="flex h-full gap-1">
              <span className="w-[34%] rounded-[5px] border border-primary/50 bg-primary/20" />
              <span className="w-[22%] rounded-[5px] border border-primary/50 bg-primary/20" />
              <span className="w-[28%] rounded-[5px] border border-chrome/40 bg-elevated" />
              <span className="flex-1 rounded-[5px] border border-primary/50 bg-primary/20" />
            </div>
          </Track>
          <Track label="A1">
            <div className="wave flex h-full items-center gap-[3px] overflow-hidden px-1">
              {WAVE.concat(WAVE).map((h, i) => (
                <i key={i} style={{ height: h, animationDelay: `${(i % 9) * -0.15}s` }} />
              ))}
            </div>
          </Track>
          <Track label="TXT">
            <div className="flex h-full items-center gap-1.5 overflow-hidden">
              {captions.map((c, i) => (
                <span key={i} className="truncate rounded-[5px] border border-line bg-bg px-1.5 py-0.5 text-[9px] text-chrome" dir="auto">
                  {c}
                </span>
              ))}
            </div>
          </Track>
          <div className="pointer-events-none absolute inset-y-[-8px] end-0 start-9">
            <span className="playhead">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Track({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-8 items-center gap-2">
      <span className="w-7 shrink-0 font-mono text-[9px] text-muted">{label}</span>
      <div className="h-full min-w-0 flex-1 overflow-hidden rounded-[7px] border border-line/70 bg-bg/60 p-1">{children}</div>
    </div>
  );
}

/** Digital: a Google search with an optimised business profile, plus a small booking site. */
export function SearchVisual() {
  const t = useTranslations("bento");
  const m = useTranslations("hero.mock");
  return (
    <div className="absolute inset-0 flex items-center gap-4 p-5" aria-hidden>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3.5 py-2" dir="ltr">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
          <span className="typed font-mono text-[11px] text-text">{t("query")}</span>
          <span className="h-3.5 w-px animate-[caret_1.1s_steps(1)_infinite] bg-primary" />
        </div>
        <div className="relative mt-3 rounded-[12px] border border-primary/50 bg-surface p-3 shadow-[0_18px_40px_-20px_rgba(47,107,255,0.6)]">
          <span className="absolute -top-2.5 end-3 rounded-full border border-primary/50 bg-bg px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
            {t("optimized")}
          </span>
          <div className="flex gap-3">
            <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[8px] border border-line bg-bg">
              <svg viewBox="0 0 64 56" className="absolute inset-0 h-full w-full"><path d="M-2 20 L66 30 M-2 42 L66 36 M20 -2 L26 58 M44 -2 L40 58"  style={{ stroke: "var(--color-line)" }}/><path d="M-2 28 C 20 22, 40 40, 66 26" strokeWidth="4" fill="none"  style={{ stroke: "var(--color-elevated)" }}/></svg>
              <IconPin className="absolute start-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 fill-primary/30 text-primary rtl:translate-x-1/2" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-text">{m("mapsName")}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted">
                <span className="flex text-chrome" dir="ltr">{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} className="h-2.5 w-2.5" />)}</span>
                <span className="truncate">· {m("mapsType")}</span>
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-accent">{m("mapsOpen")}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[IconPin, IconPhone, IconGlobe, IconCalendar].map((I, i) => (
              <span key={i} className={`flex h-6 items-center justify-center rounded-full border ${i === 3 ? "border-primary/60 bg-primary/20 text-text" : "border-line text-muted"}`}>
                <I className="h-3 w-3" />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2.5 space-y-1.5 rounded-[12px] border border-line/60 p-3 opacity-50">
          <span className="block h-2 w-1/2 rounded bg-elevated" />
          <span className="block h-2 w-3/4 rounded bg-elevated" />
        </div>
      </div>
      <div className="hidden w-[150px] shrink-0 overflow-hidden rounded-[10px] border border-line bg-bg/80 sm:block">
        <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="ms-1 h-2.5 flex-1 rounded-full bg-elevated" />
        </div>
        <div className="space-y-2 p-2.5">
          <span className="block h-16 rounded-[6px] border border-line bg-surface" />
          <span className="block h-2 w-4/5 rounded bg-elevated" />
          <span className="block h-2 w-3/5 rounded bg-elevated" />
          <span className="mt-1 flex h-6 items-center justify-center rounded-[6px] bg-primary text-[9px] font-semibold text-white">{t("book")}</span>
        </div>
      </div>
    </div>
  );
}

/** AI automation: an incoming WhatsApp message routed by the AI into reply, reminder and quote. */
export function FlowVisual() {
  const t = useTranslations("bento");
  const outs = [
    { label: t("reply"), Icon: IconCheck },
    { label: t("reminder"), Icon: IconClock },
    { label: t("quote"), Icon: IconSpark },
  ];
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg className="flow absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <path d="M50 22 L50 40" strokeWidth="1.2" vectorEffect="non-scaling-stroke"  style={{ stroke: "var(--color-primary)" }}/>
        <path d="M50 56 C50 64, 17 62, 17 70" strokeWidth="1.2" vectorEffect="non-scaling-stroke"  style={{ stroke: "var(--color-primary)" }}/>
        <path d="M50 56 L50 70" strokeWidth="1.2" vectorEffect="non-scaling-stroke"  style={{ stroke: "var(--color-primary)" }}/>
        <path d="M50 56 C50 64, 83 62, 83 70" strokeWidth="1.2" vectorEffect="non-scaling-stroke"  style={{ stroke: "var(--color-primary)" }}/>
      </svg>
      <div className="absolute inset-x-5 top-[5%] flex justify-center">
        <div className="flex max-w-full items-center gap-2 rounded-[12px] border border-line bg-surface px-3 py-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wa/15 text-wa"><IconWhatsApp className="h-3.5 w-3.5" /></span>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{t("incoming")}</p>
            <p className="truncate text-[12px] text-text" dir="ltr">{t("incomingText")}</p>
          </div>
        </div>
      </div>
      <div className="absolute start-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
        <span className="ring relative flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-bg text-chrome shadow-[0_0_40px_-8px_rgba(47,107,255,0.7)]">
          <IconSpark className="h-6 w-6" />
        </span>
      </div>
      <div className="absolute inset-x-3 top-[70%] grid grid-cols-3 gap-2">
        {outs.map(({ label, Icon }, i) => (
          <span key={i} className="flex flex-col items-center gap-1.5 rounded-[10px] border border-line bg-surface px-1 py-2 text-center">
            <Icon className="h-4 w-4 text-accent" />
            <span className="text-[11px] font-medium text-text">{label}</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-[3%] space-y-0.5 font-mono text-[10px] text-muted" dir="ltr">
        <p><span className="text-accent">✓</span> 19:42 · <span dir="auto">{t("log1")}</span></p>
        <p><span className="text-accent">✓</span> 19:43 · <span dir="auto">{t("log2")}</span></p>
      </div>
    </div>
  );
}
