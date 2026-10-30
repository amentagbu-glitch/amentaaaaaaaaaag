import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IconArrow, IconCheck, IconGlobe, IconSpark, IconVideo } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/services") };
}

const sections = [
  { k: "content", Icon: IconVideo },
  { k: "digital", Icon: IconGlobe },
  { k: "ai", Icon: IconSpark },
] as const;

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("servicesPage");
  return (
    <>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="container-x space-y-6 pb-24">
        {sections.map(({ k, Icon }, i) => (
          <Reveal key={k}>
            <section id={k} className="glass scroll-mt-24 p-6 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="label-mono">
                    <span className="text-accent">0{i + 1}</span> {t(`sections.${k}.title`)}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="text-3xl font-semibold sm:text-4xl">{t(`sections.${k}.title`)}</h2>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{t(`sections.${k}.lead`)}</p>
                  <div className="mt-8 rounded-[12px] border border-line bg-bg/50 p-5">
                    <p className="label-mono">{t("forWho")}</p>
                    <p className="mt-2 leading-relaxed text-chrome">{t(`sections.${k}.forWho`)}</p>
                  </div>
                  <Link href="/contact" className="btn btn-primary mt-8">
                    {t("cta")} <IconArrow className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <List title={t("included")} items={t.raw(`sections.${k}.included`) as string[]} />
                  <List title={t("deliverables")} items={t.raw(`sections.${k}.deliverables`) as string[]} />
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="label-mono">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 border-b border-line/60 pb-3 text-chrome">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
