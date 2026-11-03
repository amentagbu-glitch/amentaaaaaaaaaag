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
import { Marquee } from "@/components/Marquee";
import { Clients } from "@/components/Clients";
import { FeaturedCase } from "@/components/FeaturedCase";
import Script from "next/script";
import { Spot } from "@/components/Spot";
import { HeroGlobe } from "@/components/HeroGlobe";
import { LogoLines } from "@/components/LogoLines";
import { TimelineVisual, SearchVisual, FlowVisual } from "@/components/BentoVisuals";

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
      <Clients />
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

function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="word" style={{ ["--i" as string]: start + i }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

function FounderChip() {
  const t = useTranslations("hero");
  const a = useTranslations("aboutPage");
  return (
    <Link
      href="/about#founder"
      className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pe-4 ps-1.5 backdrop-blur transition-colors hover:border-line-strong"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/team/oussama-amentag-avatar.jpg" alt="" width={192} height={192} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/50" />
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] text-muted">{t("foundedBy")}</span>
        <span className="text-sm font-semibold text-text" dir="ltr">{a("founderName")}</span>
      </span>
      <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text">
        {a("founderBadge")}
      </span>
    </Link>
  );
}

function Hero() {
  const t = useTranslations("hero");
  const a = t("titleA");
  return (
    <>
      <section data-tilt className="relative -mt-[4.25rem] overflow-hidden pb-[270px] pt-[6.5rem] sm:pb-[300px] sm:pt-32 lg:pb-[340px] lg:pt-32">
        <div className="grid-bg" />
        <HeroGlobe />
        <LogoLines className="ll-parallax absolute inset-x-0 top-[118px] mx-auto w-[94%] sm:w-[70%] lg:inset-x-auto lg:start-[1%] lg:top-[64px] lg:mx-0 lg:w-[43%] xl:start-[4%] xl:w-[40%]" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pe-4 ps-3 backdrop-blur">
                <span className="live-dot" />
                <span className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chrome">{t("status")}</span>
                <span className="h-3 w-px bg-line" />
                <span className="whitespace-nowrap font-mono text-[0.7rem] tabular-nums tracking-[0.08em] text-muted" dir="ltr">
                  AGADIR <span data-clock className="text-chrome" />
                </span>
              </div>
            </Reveal>
            <h1 className="mt-7 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]">
              <span className="text-muted">
                <Words text={a} />
              </span>
              <span className="text-text">
                <Words text={t("titleB")} start={a.split(" ").length} />
              </span>
              <span className="inline-block h-[0.8em] w-[3px] translate-y-[0.08em] animate-[caret_1.1s_steps(1)_infinite] bg-primary align-baseline" aria-hidden />
            </h1>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-primary group shadow-[0_8px_30px_-8px_rgba(47,107,255,0.6)]">
                  {t("ctaPrimary")}
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
                <Link href="/work" className="btn btn-secondary bg-surface/40 backdrop-blur">
                  {t("ctaSecondary")}
                </Link>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <IconCheck className="h-4 w-4 text-accent" /> {t("note")}
              </p>
              <FounderChip />
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <HeroDevices />
          </Reveal>
        </div>
      </section>
      <Script src="/globe.js" strategy="afterInteractive" />
      <Marquee />
    </>
  );
}

function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; text: string }[];
  const icons = [IconPin, IconLayers, IconChat];
  return (
    <Section>
      <SectionHeader index="01" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={i} delay={i * 0.06}>
              <article data-spot className="glass hud lift h-full p-6">
                <Spot />
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-elevated text-chrome">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-danger">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger" /> 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-medium tracking-[-0.02em]">{it.title}</h3>
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
  return (
    <Section id="services">
      <SectionHeader index="02" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <BentoTile k="content" index={1} Icon={IconVideo} wide>
            <TimelineVisual />
          </BentoTile>
        </Reveal>
        <Reveal className="lg:row-span-2" delay={0.06}>
          <BentoTile k="ai" index={3} Icon={IconSpark} tall>
            <FlowVisual />
          </BentoTile>
        </Reveal>
        <Reveal className="lg:col-span-2" delay={0.1}>
          <BentoTile k="digital" index={2} Icon={IconGlobe} wide>
            <SearchVisual />
          </BentoTile>
        </Reveal>
      </div>
    </Section>
  );
}

function BentoTile({ k, index, Icon, wide, tall, children }: { k: "content" | "digital" | "ai"; index: number; Icon: typeof IconVideo; wide?: boolean; tall?: boolean; children: React.ReactNode }) {
  const t = useTranslations("services");
  return (
    <article data-spot className={`glass hud group flex h-full flex-col overflow-hidden ${wide ? "lg:grid lg:grid-cols-[0.85fr_1.15fr]" : ""}`}>
      <Spot />
      <div className={`relative border-line bg-bg/40 ${wide ? "h-56 border-b lg:order-2 lg:h-auto lg:min-h-[300px] lg:border-b-0 lg:border-s" : tall ? "h-[340px] border-b" : "h-56 border-b"}`}>
        <div className="grid-bg ![mask-image:none] opacity-40" />
        {children}
        <span className="absolute end-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted" dir="ltr">
          SRV—0{index}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-primary/30 bg-primary/10 text-primary">
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <h3 className="text-2xl font-medium tracking-[-0.02em]">{t(`items.${k}.title`)}</h3>
        </div>
        <p className="mt-3 text-muted">{t(`items.${k}.text`)}</p>
        <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
          {(t.raw(`items.${k}.points`) as string[]).map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-chrome">
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" /> {p}
            </li>
          ))}
        </ul>
        <Link href={`/services#${k}`} className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-text hover:text-primary">
          {t("more")} <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </article>
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
      <ol data-fill className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <span aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-line lg:block">
          <span className="fill-x absolute inset-0 bg-primary" />
        </span>
        <span aria-hidden className="absolute start-5 top-0 h-full w-px bg-line sm:hidden">
          <span className="fill-y absolute inset-0 bg-primary" />
        </span>
        {steps.map((s, i) => (
          <li key={i} data-step data-active={i === 0 ? "" : undefined} className="relative list-none ps-14 sm:ps-0">
            <span className="node absolute start-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs text-chrome sm:static">
              0{i + 1}
            </span>
            <h3 className="mt-1.5 text-2xl font-medium tracking-[-0.02em] sm:mt-6">{s.title}</h3>
            <p className="mt-2 max-w-[30ch] leading-relaxed text-muted">{s.text}</p>
          </li>
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
      <Reveal className="mt-12">
        <FeaturedCase />
      </Reveal>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
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
      <SectionHeader index="06" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const featured = i === 1;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <article data-spot className={`glass relative flex h-full flex-col p-6 sm:p-7 ${featured ? "!border-primary/60 !bg-elevated/70 shadow-[0_30px_80px_-30px_rgba(47,107,255,0.45)]" : "hud"}`}>
                <Spot />
                {featured && <span className="beam-dot" aria-hidden />}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-chrome">{p.name}</h3>
                  {featured && (
                    <span className="rounded-full border border-primary/50 bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text">
                      {t("popular")}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-muted">{p.desc}</p>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-sm text-muted">{t("from")}</p>
                  <p className="mt-1 font-heading text-[2.6rem] font-medium leading-none tracking-[-0.03em] text-text">{p.price}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-chrome">{p.period}</p>
                </div>
                <ul className="mt-7 space-y-3">
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
      <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <span className="h-px w-6 bg-line" /> {t("note")}
      </p>
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
          <div className="glass hud grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="relative">
              <LogoLines className="absolute bottom-0 start-0 hidden w-[78%] lg:block" />
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
