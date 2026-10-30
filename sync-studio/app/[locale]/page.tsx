import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { alternates, site, whatsappLink } from "@/lib/site";
import { HeroDevices } from "@/components/HeroDevices";
import { ChatMock } from "@/components/ChatMock";
import { AuditForm } from "@/components/AuditForm";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader, SectionLabel } from "@/components/Section";
import { CaseCard } from "@/components/CaseCard";
import { IconArrow, IconCheck, IconChart, IconChat, IconClock, IconGlobe, IconPin, IconRepeat, IconLayers, IconSpark, IconVideo, IconWhatsApp } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: { absolute: t("title") }, description: t("description"), alternates: alternates(locale) };
}

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <AiAdvantage />
      <Process />
      <Work />
      <Offers />
      {site.showTestimonials && <Testimonials />}
      <FinalCta />
    </>
  );
}

function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pt-20">
      <div className="glow -top-48 start-[-10%] h-[520px] w-[520px] sm:start-[5%]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <SectionLabel index="00">{t("label")}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] text-text sm:text-6xl lg:text-[4.4rem]">{t("title")}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                {t("ctaPrimary")}
                <IconArrow className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <Link href="/work" className="btn btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <IconCheck className="h-4 w-4 text-accent" /> {t("note")}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <HeroDevices />
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; text: string }[];
  const icons = [IconPin, IconLayers, IconChat];
  return (
    <Section>
      <SectionHeader index="01" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={i} delay={i * 0.06}>
              <article className="glass h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-elevated text-chrome">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Services() {
  const t = useTranslations("services");
  const keys = [
    { k: "content", Icon: IconVideo },
    { k: "digital", Icon: IconGlobe },
    { k: "ai", Icon: IconSpark },
  ] as const;
  return (
    <Section id="services">
      <SectionHeader index="02" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {keys.map(({ k, Icon }, i) => (
          <Reveal key={k} delay={i * 0.06}>
            <article className="glass group flex h-full flex-col p-6 transition-colors hover:border-[#3a4868]">
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-primary/30 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{t(`items.${k}.title`)}</h3>
              <p className="mt-2 text-muted">{t(`items.${k}.text`)}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {(t.raw(`items.${k}.points`) as string[]).map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-chrome">
                    <IconCheck className="h-4 w-4 shrink-0 text-primary" /> {p}
                  </li>
                ))}
              </ul>
              <Link href={`/services#${k}`} className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-text hover:text-primary">
                {t("more")} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function AiAdvantage() {
  const t = useTranslations("ai");
  const points = t.raw("points") as { title: string; text: string }[];
  const icons = [IconClock, IconRepeat, IconLayers, IconChart];
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader index="03" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
          <ul className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {points.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="list-none">
                    <Icon className="h-5 w-5 text-chrome" />
                    <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <ChatMock />
        </Reveal>
      </div>
    </Section>
  );
}

function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <Section>
      <SectionHeader index="04" label={t("label")} title={t("title")} />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <li className="relative list-none">
              <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pe-5 ps-1.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-xs font-medium text-white">{i + 1}</span>
                <span className="font-heading text-lg font-semibold">{s.title}</span>
              </div>
              <p className="mt-4 max-w-[30ch] ps-1 leading-relaxed text-muted">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Work() {
  const t = useTranslations("work");
  const cases = t.raw("cases") as { type: string; problem: string; solution: string; result: string }[];
  return (
    <Section id="work">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader index="05" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
        <Reveal>
          <Link href="/work" className="btn btn-secondary">
            {t("cta")} <IconArrow className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <CaseCard c={c} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Offers() {
  const t = useTranslations("offers");
  const plans = t.raw("plans") as { name: string; price: string; period: string; desc: string; features: string[] }[];
  return (
    <Section id="offers">
      <SectionHeader index="06" label={t("label")} title={t("title")} subtitle={t("subtitle")} center />
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const featured = i === 1;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className={`glass relative flex h-full flex-col p-6 sm:p-7 ${featured ? "!border-primary/70 !bg-elevated/70" : ""}`}>
                {featured && (
                  <span className="absolute -top-3 start-6 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                    {t("popular")}
                  </span>
                )}
                <h3 className="font-heading text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.desc}</p>
                <p className="mt-6 text-sm text-muted">{t("from")}</p>
                <p className="font-heading text-4xl font-semibold tracking-tight text-text">{p.price}</p>
                <p className="mt-1 text-sm text-chrome">{p.period}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-chrome">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn mt-auto w-full ${featured ? "btn-primary" : "btn-secondary"}`} style={{ marginTop: "2rem" }}>
                  {t("cta")}
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-muted">{t("note")}</p>
    </Section>
  );
}

function Testimonials() {
  const t = useTranslations("testimonials");
  return (
    <Section>
      <SectionHeader index="07" label={t("label")} title={t("title")} />
      {/* Add real short video quotes here, then set site.showTestimonials = true */}
    </Section>
  );
}

function FinalCta() {
  const t = useTranslations("finalCta");
  const w = useTranslations("whatsapp");
  return (
    <section id="audit" className="relative overflow-hidden py-20 sm:py-28">
      <div className="glow -bottom-40 end-[-10%] h-[480px] w-[480px]" />
      <div className="container-x relative">
        <Reveal>
          <div className="glass grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <SectionLabel index={site.showTestimonials ? "08" : "07"}>{t("label")}</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{t("title")}</h2>
              <p className="mt-4 text-muted">{t("subtitle")}</p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm text-chrome">{t("or")}</p>
                <a href={whatsappLink(w("prefill"))} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-3">
                  <IconWhatsApp className="h-4 w-4 text-wa" /> {t("whatsapp")}
                </a>
              </div>
            </div>
            <AuditForm idPrefix="home-audit" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
