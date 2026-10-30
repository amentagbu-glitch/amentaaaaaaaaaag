import { useTranslations } from "next-intl";
import { IconChat, IconHeart, IconPhone, IconPin, IconPlay, IconStar, IconWhatsApp, IconGlobe, IconCalendar } from "./icons";

/** Placeholder device screens: a Google Maps profile (laptop), a reel (phone) and a WhatsApp chat (card). */
export function HeroDevices() {
  const t = useTranslations("hero.mock");
  return (
    <div className="relative mx-auto aspect-[10/8.2] w-full max-w-[560px]" aria-hidden>
      {/* Laptop: Google Maps profile */}
      <div className="absolute inset-x-[2%] top-[16%] sm:inset-x-[4%]">
        <div className="rounded-t-[14px] border border-line bg-elevated p-[1.6%] pb-[2%]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-surface">
            <MapArt />
            <div className="absolute start-[4%] top-[6%] flex w-[48%] items-center gap-1.5 rounded-full border border-line bg-bg/90 px-2.5 py-1 text-[9px] text-muted sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-chrome/60" />
              <span className="truncate">{t("mapsName")}</span>
            </div>
            <div className="absolute start-[46%] top-[26%] text-primary">
              <IconPin className="h-6 w-6 fill-primary/25 sm:h-7 sm:w-7" />
            </div>
            <div className="absolute inset-x-[4%] bottom-[5%] rounded-[10px] border border-line bg-bg/95 p-[3%]">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-heading text-[11px] font-semibold text-text sm:text-[13px]">{t("mapsName")}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px] text-muted sm:text-[10px]">
                    <span className="flex text-chrome" dir="ltr">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <IconStar key={i} className="h-2.5 w-2.5" />
                      ))}
                    </span>
                    <span className="truncate">· {t("mapsType")}</span>
                  </div>
                  <p className="mt-0.5 text-[9px] font-medium text-accent sm:text-[10px]">{t("mapsOpen")}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-7 w-7 rounded-[6px] border border-line bg-elevated sm:h-9 sm:w-9" />
                  ))}
                </div>
              </div>
              <div className="mt-[4%] grid grid-cols-4 gap-1">
                {[
                  { Icon: IconPin, l: t("mapsDirections") },
                  { Icon: IconPhone, l: t("mapsCall") },
                  { Icon: IconGlobe, l: t("mapsWebsite") },
                  { Icon: IconCalendar, l: t("mapsBook") },
                ].map(({ Icon, l }, i) => (
                  <span key={i} className={`flex items-center justify-center gap-1 rounded-full border px-1 py-1 text-[8px] sm:text-[9px] ${i === 0 ? "border-primary/50 bg-primary/15 text-text" : "border-line text-muted"}`}>
                    <Icon className="h-2.5 w-2.5 shrink-0" />
                    <span className="hidden truncate sm:inline">{l}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative -mx-[5%] h-[10px] rounded-b-[12px] border border-t-0 border-line bg-elevated">
          <span className="absolute start-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-md bg-line rtl:translate-x-1/2" />
        </div>
      </div>

      {/* Phone: reel */}
      <div className="absolute bottom-[1%] end-[1%] w-[33%] max-w-[180px] animate-float [animation-delay:-2s]">
        <div className="rounded-[26px] border border-line bg-elevated p-[5%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[9/18.5] overflow-hidden rounded-[20px] bg-surface">
            <ReelArt />
            <span className="absolute start-[8%] top-[5%] rounded-full bg-bg/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-chrome">
              {t("reel")}
            </span>
            <div className="absolute end-[7%] top-[46%] flex flex-col items-center gap-2.5 text-chrome">
              <IconHeart className="h-3.5 w-3.5" />
              <IconChat className="h-3.5 w-3.5" />
            </div>
            <div className="absolute inset-x-[8%] bottom-[6%]">
              <p className="text-[8px] leading-snug text-text sm:text-[9px]">{t("reelCaption")}</p>
              <div className="mt-2 h-[2px] w-full rounded bg-line">
                <div className="h-full w-[38%] rounded bg-chrome" />
              </div>
            </div>
            <span className="absolute start-1/2 top-[38%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-bg/60 text-text backdrop-blur rtl:translate-x-1/2">
              <IconPlay className="h-3.5 w-3.5 translate-x-[1px]" />
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp card */}
      <div className="glass absolute start-0 top-0 w-[58%] max-w-[260px] animate-float p-2.5 sm:p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-wa/15 text-wa">
            <IconWhatsApp className="h-3.5 w-3.5" />
          </span>
          <span className="text-[10px] font-medium text-chrome sm:text-[11px]">WhatsApp</span>
          <span className="ms-auto font-mono text-[9px] text-muted" dir="ltr">20:14</span>
        </div>
        <p className="mt-2 w-fit max-w-[90%] rounded-[10px] rounded-ss-[3px] bg-elevated px-2.5 py-1.5 text-[10px] text-text sm:text-[11px]">{t("waMsg")}</p>
        <p className="ms-auto mt-1.5 w-fit max-w-[90%] rounded-[10px] rounded-se-[3px] border border-primary/30 bg-primary/15 px-2.5 py-1.5 text-[10px] text-text sm:text-[11px]">
          {t("waReply")}
        </p>
      </div>
    </div>
  );
}

function MapArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="200" fill="#0F1626" />
      <path d="M0 150 C 80 130, 120 170, 200 140 S 300 120, 320 128 L320 200 L0 200z" fill="#0c1a2e" />
      <g stroke="#2A3550" strokeWidth="1" fill="none">
        <path d="M-10 40 L330 70" />
        <path d="M-10 110 L330 90" />
        <path d="M60 -10 L90 210" />
        <path d="M170 -10 L150 210" />
        <path d="M250 -10 L280 210" />
      </g>
      <g stroke="#1A2236" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M-10 75 C 100 60, 200 100, 330 60" />
        <path d="M120 -10 C 130 80, 110 140, 130 210" />
      </g>
      <g fill="#1A2236">
        <rect x="20" y="10" width="30" height="20" rx="3" />
        <rect x="200" y="15" width="38" height="26" rx="3" />
        <rect x="270" y="95" width="34" height="22" rx="3" />
        <rect x="190" y="105" width="26" height="18" rx="3" />
      </g>
    </svg>
  );
}

function ReelArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 90 185" preserveAspectRatio="xMidYMid slice">
      <rect width="90" height="185" fill="#0F1626" />
      <rect y="110" width="90" height="75" fill="#121c30" />
      <ellipse cx="45" cy="118" rx="34" ry="8" fill="#1A2236" />
      <path d="M22 116 Q45 60 68 116z" fill="#1A2236" stroke="#2A3550" />
      <path d="M45 70 v-6" stroke="#C9D1E0" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="62" r="2.5" fill="#C9D1E0" />
      <path d="M30 104 Q45 98 60 104" stroke="#2A3550" fill="none" />
    </svg>
  );
}
