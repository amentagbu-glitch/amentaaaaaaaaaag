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
      <div className="container-x grid gap-6 pb-10 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <div className="glass h-full p-6 sm:p-10">
            <blockquote className="font-heading text-2xl font-medium leading-snug text-text sm:text-[1.9rem]">
              <span className="text-primary">“</span>
              {t("story")}
              <span className="text-primary">”</span>
            </blockquote>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t("storyMore")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass flex h-full flex-col p-6">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[12px] border border-dashed border-line bg-elevated/50">
              <span className="label-mono">{t("founderPhoto")}</span>
            </div>
            <p className="label-mono mt-5">{t("founderLabel")}</p>
            <p className="mt-1.5 font-heading text-xl font-semibold">{t("founderName")}</p>
            <p className="text-sm text-muted">{t("founderRole")}</p>
          </div>
        </Reveal>
      </div>
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeader label={t("valuesLabel")} title={t("valuesTitle")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="glass h-full p-6">
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
