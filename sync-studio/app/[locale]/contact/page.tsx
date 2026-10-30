import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternates, site, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AuditForm } from "@/components/AuditForm";
import { IconCheck, IconMail, IconPin, IconWhatsApp } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/contact") };
}

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contactPage");
  const w = useTranslations("whatsapp");
  return (
    <>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="container-x grid gap-6 pb-24 lg:grid-cols-[1.35fr_0.65fr]">
        <Reveal>
          <div className="glass p-6 sm:p-10">
            <AuditForm idPrefix="contact-audit" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <aside className="space-y-6">
            <div className="glass p-6">
              <p className="label-mono">{t("direct")}</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href={whatsappLink(w("prefill"))} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-chrome hover:text-text">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-wa"><IconWhatsApp className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs text-muted">{t("whatsapp")}</span>
                      <span dir="ltr">{site.whatsapp ? `+${site.whatsapp}` : "wa.me/[number]"}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-chrome hover:text-text">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line"><IconMail className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs text-muted">{t("email")}</span>
                      <span dir="ltr">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-chrome">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line"><IconPin className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-xs text-muted">{t("location")}</span>
                    {t("locationValue")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="glass p-6">
              <p className="label-mono">{t("what")}</p>
              <ul className="mt-5 space-y-3">
                {(t.raw("whatItems") as string[]).map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-chrome">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
