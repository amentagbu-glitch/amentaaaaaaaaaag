import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CaseCard, type Case } from "@/components/CaseCard";
import { IconArrow } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/work") };
}

export default function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("workPage");
  const w = useTranslations("work");
  const n = useTranslations("nav");
  const cases = w.raw("cases") as Case[];
  return (
    <>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="container-x pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <CaseCard c={c} index={i} detailed />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link href="/contact" className="btn btn-primary">
            {n("ctaLong")} <IconArrow className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </>
  );
}
