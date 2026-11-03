import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/Section";
import { IconArrow } from "@/components/icons";
import { Spot } from "@/components/Spot";

const TOOLS = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop", "Illustrator", "Blender", "Resolume"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/about") };
}

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("aboutPage");
  const n = useTranslations("nav");
  const values = t.raw("values") as { title: string; text: string }[];
  return (
    <>
      <PageHero label={t("label")} title={t("title")} />
      <div className="container-x pb-10">
        <Reveal>
          <div className="glass p-6 sm:p-10">
            <blockquote className="max-w-4xl font-heading text-2xl font-medium leading-snug text-text sm:text-[1.9rem]">
              <span className="text-primary">“</span>
              {t("story")}
              <span className="text-primary">”</span>
            </blockquote>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t("storyMore")}</p>
          </div>
        </Reveal>
      </div>

      <section id="founder" className="container-x scroll-mt-24 pb-10">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <figure data-spot className="glass hud relative flex h-full flex-col overflow-hidden p-3">
              <Spot />
              <div className="relative overflow-hidden rounded-[12px] lg:min-h-0 lg:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/oussama-amentag.jpg"
                  alt={t("founderPhotoAlt")}
                  width={720}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-[50%_30%] lg:aspect-auto lg:h-full"
                />
                <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t("founderBadge")}
                </span>
              </div>
              <figcaption className="px-2 pb-2 pt-4">
                <p className="font-heading text-xl font-semibold"><span dir="ltr">{t("founderName")}</span></p>
                <p className="text-sm text-muted">{t("founderRole")}</p>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass h-full p-6 sm:p-10">
              <p className="label-mono">{t("founderTitle")}</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                <span dir="ltr">{t("founderName")}</span>
              </h2>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm text-text">
                <span className="font-semibold">{t("founderBadge")}</span>
                <span className="h-3 w-px bg-line" />
                <span className="text-chrome">{t("founderRole")}</span>
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t("founderBio")}</p>
              <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="label-mono">{t("highlightsTitle")}</p>
                  <ul className="mt-4 space-y-3">
                    {(t.raw("highlights") as string[]).map((h) => (
                      <li key={h} className="flex items-start gap-3 border-b border-line/60 pb-3 text-sm text-chrome">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span dir="auto">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-mono">{t("toolsTitle")}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
                    {TOOLS.map((tool) => (
                      <li key={tool} className="rounded-full border border-line bg-bg/50 px-3 py-1.5 font-mono text-[11px] text-chrome">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeader label={t("valuesLabel")} title={t("valuesTitle")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="glass hud lift h-full p-6">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <Link href="/contact" className="btn btn-primary">
              {n("ctaLong")} <IconArrow className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
