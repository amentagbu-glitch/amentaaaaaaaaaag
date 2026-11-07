import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import { alternates, whatsappLink } from "@/lib/site";
import { AuditForm } from "@/components/AuditForm";
import { Reveal } from "@/components/Reveal";
import { CaseCard } from "@/components/CaseCard";
import { Marquee } from "@/components/Marquee";
import { Clients } from "@/components/Clients";
import { FeaturedCase } from "@/components/FeaturedCase";
import { HeroGlobe } from "@/components/HeroGlobe";
import { LogoLines } from "@/components/LogoLines";
import { SectionHead } from "@/components/v2/SectionHead";
import { ScoreQuiz } from "@/components/v2/ScoreQuiz";
import { ServicesShowcase } from "@/components/v2/ServicesShowcase";
import { AiDemo } from "@/components/v2/AiDemo";
import { PackageBuilder } from "@/components/v2/PackageBuilder";
import { IconArrow, IconChart, IconCheck, IconLayers, IconSpark, IconWhatsApp } from "@/components/icons";

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
      <Marquee />
      <ScoreSection />
      <ServicesShowcase />
      <AiSection />
      <Work />
      <Process />
      <BuilderSection />
      <FinalCta />
      <Script src="/globe.js" strategy="afterInteractive" />
    </>
  );
}

function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="word" style={{ ["--i" as string]: start + i }}>{w}</span>{" "}
        </span>
      ))}
    </>
  );
}

function Hero() {
  const t = useTranslations("v2.hero");
  const a = useTranslations("aboutPage");
  const h = useTranslations("hero");
  const t1 = t("title1");
  const actions = [
    { href: "#score", label: t("actions.score"), Icon: IconChart },
    { href: "#ai-demo", label: t("actions.ai"), Icon: IconSpark },
    { href: "#builder", label: t("actions.builder"), Icon: IconLayers },
  ];
  return (
    <section data-tilt className="relative -mt-[4.25rem] overflow-hidden pb-[310px] pt-[7.5rem] sm:pb-[300px] sm:pt-36 lg:pb-[320px]">
      <div className="grid-bg" />
      <HeroGlobe />
      <LogoLines className="ll-parallax absolute inset-x-0 top-[110px] mx-auto w-[min(1000px,118%)] opacity-90 sm:top-[90px]" />
      <div className="container-x relative flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pe-4 ps-3 backdrop-blur">
          <span className="live-dot" />
          <span className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chrome">{t("kicker")}</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span className="hidden whitespace-nowrap font-mono text-[0.7rem] tabular-nums tracking-[0.08em] text-muted sm:inline" dir="ltr">
            <span data-clock className="text-chrome" />
          </span>
        </div>
        <h1 className="hero-title mt-8 max-w-[14ch]">
          <span className="block text-muted"><Words text={t1} /></span>
          <span className="block text-text">
            <Words text={t("title2")} start={t1.split(" ").length} />
            <span className="inline-block h-[0.78em] w-[0.06em] min-w-[3px] translate-y-[0.06em] animate-[caret_1.1s_steps(1)_infinite] bg-primary align-baseline" aria-hidden />
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>

        <button type="button" data-cmdk-open className="command-bar group mt-10 w-full max-w-2xl">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
          </span>
          <span className="sr-only">{t("commandLabel")}</span>
          <span className="min-w-0 flex-1 truncate text-start text-base sm:text-lg" aria-hidden>
            <span className="text-muted">{t("commandPrefix")} </span>
            <span data-typer data-words={JSON.stringify(t.raw("suggestions"))} className="text-text" />
            <span className="ms-0.5 inline-block h-5 w-px translate-y-1 animate-[caret_1.1s_steps(1)_infinite] bg-primary" />
          </span>
          <span className="hidden shrink-0 items-center gap-0.5 sm:flex" dir="ltr">
            <kbd className="kbd" data-kbd-mod>Ctrl</kbd>
            <kbd className="kbd">K</kbd>
          </span>
        </button>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {actions.map(({ href, label, Icon }) => (
            <a key={href} href={href} data-magnetic className="quick-action">
              <Icon className="h-4 w-4 text-primary" /> {label}
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/about#founder" className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pe-4 ps-1.5 backdrop-blur transition-colors hover:border-line-strong">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/team/oussama-amentag-avatar.jpg" alt="" width={192} height={192} className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/50" />
            <span className="text-start text-sm leading-tight">
              <span className="block text-[11px] text-muted">{h("foundedBy")}</span>
              <span className="font-semibold text-text" dir="ltr">{a("founderName")}</span>
            </span>
          </Link>
          <p className="flex items-center gap-2 text-sm text-muted"><IconCheck className="h-4 w-4 text-accent" /> {h("note")}</p>
        </div>
      </div>
    </section>
  );
}

function ScoreSection() {
  const v = useTranslations("v2.sections.score");
  return (
    <section id="score" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHead index="01" label={v("label")} title={v("title")} subtitle={v("subtitle")} />
        <div className="mt-12"><ScoreQuiz /></div>
      </div>
    </section>
  );
}

function AiSection() {
  const v = useTranslations("v2.sections.ai");
  const t = useTranslations("v2.ai");
  return (
    <section id="ai-demo" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="glow -top-20 end-[5%] h-[380px] w-[380px]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead index="03" label={v("label")} title={v("title")} subtitle={v("subtitle")} />
          <Link href="/contact" data-magnetic className="btn btn-secondary btn-pill shrink-0">
            {t("cta")} <span className="btn-arrow"><IconArrow className="h-4 w-4 rtl:-scale-x-100" /></span>
          </Link>
        </div>
        <div className="mt-12"><AiDemo /></div>
      </div>
    </section>
  );
}

function Work() {
  const t = useTranslations("work");
  const v = useTranslations("v2.sections.work");
  const cases = t.raw("cases") as { type: string; problem: string; solution: string; result: string }[];
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead index="04" label={v("label")} title={v("title")} subtitle={t("subtitle")} />
          <Link href="/work" data-magnetic className="btn btn-secondary btn-pill shrink-0">
            {t("cta")} <span className="btn-arrow"><IconArrow className="h-4 w-4 rtl:-scale-x-100" /></span>
          </Link>
        </div>
        <div className="mt-12"><FeaturedCase /></div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <CaseCard c={c} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const t = useTranslations("process");
  const v = useTranslations("v2.sections.process");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHead index="05" label={v("label")} title={t("title")} />
        <ol data-fill className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-line lg:block">
            <span className="fill-x absolute inset-0 bg-primary" />
          </span>
          <span aria-hidden className="absolute start-5 top-0 h-full w-px bg-line sm:hidden">
            <span className="fill-y absolute inset-0 bg-primary" />
          </span>
          {steps.map((s, i) => (
            <li key={i} data-step data-active={i === 0 ? "" : undefined} className="relative list-none ps-14 sm:ps-0">
              <span className="node absolute start-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs text-chrome sm:static">0{i + 1}</span>
              <h3 className="mt-1.5 text-2xl font-medium tracking-[-0.02em] sm:mt-6">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BuilderSection() {
  const v = useTranslations("v2.sections.builder");
  return (
    <section id="builder" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHead index="06" label={v("label")} title={v("title")} subtitle={v("subtitle")} />
        <div className="mt-12"><PackageBuilder /></div>
      </div>
    </section>
  );
}

function FinalCta() {
  const t = useTranslations("finalCta");
  const w = useTranslations("whatsapp");
  const v = useTranslations("v2.sections.cta");
  return (
    <section id="audit" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow -bottom-40 start-1/2 h-[460px] w-[min(900px,90vw)] -translate-x-1/2 rtl:translate-x-1/2" />
      <div className="container-x relative">
        <div className="panel grid gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="relative flex flex-col">
            <SectionHead index="07" label={v("label")} title={t("title")} subtitle={t("subtitle")} className="!grid-cols-1" />
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-sm text-chrome">{t("or")}</p>
              <a href={whatsappLink(w("prefill"))} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-secondary btn-pill mt-3">
                <IconWhatsApp className="h-4 w-4 text-wa" /> {t("whatsapp")}
              </a>
            </div>
            <LogoLines className="relative mt-auto hidden w-[70%] pt-10 lg:block" />
          </div>
          <AuditForm idPrefix="home-audit" />
        </div>
      </div>
    </section>
  );
}
