/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { clients } from "@/lib/clients";
import { ReelCarousel } from "./ReelCarousel";
import { Spot } from "./Spot";
import { IconGlobe, IconInstagram, IconTikTok } from "./icons";

/** Real client case study: Mou's Doner Kabab (Rabat), with the launch reel. */
export function FeaturedCase() {
  const t = useTranslations("work.featured");
  const c = clients[0];
  const rows = [
    { label: t("challengeLabel"), text: t("challenge") },
    { label: t("doneLabel"), text: t("done") },
    { label: t("deliverableLabel"), text: t("deliverable") },
  ];
  return (
    <article id={c.id} data-spot className="glass hud scroll-mt-28 overflow-hidden">
      <Spot />
      <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative flex items-center justify-center border-b border-line bg-bg/40 px-6 py-10 lg:border-b-0 lg:border-e">
          <div className="grid-bg ![mask-image:none] opacity-40" />
          <ReelCarousel
            slides={c.reels.map((r) => ({ src: r.src, poster: r.poster, title: t(`slides.${r.key}.title`), meta: t(`slides.${r.key}.meta`) }))}
            labels={{ prev: t("prev"), next: t("next"), soundOn: t("soundOn"), soundOff: t("soundOff"), play: t("play"), slide: t("slide") }}
          />
          <span className="absolute start-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted" dir="ltr">
            {t("videosCount", { n: c.reels.length })}
          </span>
        </div>
        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text">
              <span className="live-dot !h-1.5 !w-1.5" /> {t("badge")}
            </span>
            <span className="rounded-[12px] bg-white p-2 shadow-sm ring-1 ring-black/5">
              <img src={c.logo} alt={c.name} width={c.logoSize.width} height={c.logoSize.height} loading="lazy" className="h-12 w-auto" />
            </span>
          </div>
          <h3 className="mt-6 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            <span dir="ltr">{t("client")}</span>
          </h3>
          <p className="mt-1 text-muted">{t("type")}</p>
          <dl className="mt-8 space-y-5">
            {rows.map((r) => (
              <div key={r.label} className="border-t border-line pt-4">
                <dt className="label-mono">{r.label}</dt>
                <dd className="mt-1.5 leading-relaxed text-chrome">{r.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-line pt-5">
            <p className="label-mono">{t("linksLabel")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                { href: c.links.website, label: "mous.ma", Icon: IconGlobe },
                { href: c.links.instagram, label: "Instagram", Icon: IconInstagram },
                { href: c.links.tiktok, label: "TikTok", Icon: IconTikTok },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("client")} · ${label}`}
                    className="btn btn-secondary !min-h-10 !px-3.5 !text-sm"
                  >
                    <Icon className="h-4 w-4" /> <span dir="ltr">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
