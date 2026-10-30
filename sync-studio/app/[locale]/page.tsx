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
    <>
      <section className="relative -mt-[4.25rem] overflow-hidden pb-16 pt-[6.5rem] sm:pb-24 sm:pt-32 lg:pt-36">
        <div className="grid-bg" />
        <div className="glow -top-56 start-[-12%] h-[560px] w-[560px] sm:start-[2%]" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pe-4 ps-3 backdrop-blur">
                <span className="live-dot" />
                <span className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chrome">{t("status")}</span>
                <span className="h-3 w-px bg-line" />
                <span className="whitespace-nowrap font-mono text-[0.7rem] tracking-[0.08em] text-muted" dir="ltr">
                  AGADIR<span className="hidden sm:inline"> · 30.42°N 9.60°W</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] text-text sm:text-6xl lg:text-[4.6rem]">
                {t("title")}
                <span className="ms-2 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] animate-[caret_1.1s_steps(1)_infinite] bg-primary align-baseline" aria-hidden />
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.15}>
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
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <HeroDevices />
          </Reveal>
        </div>
      </section>
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
              <article className="glass hud lift h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-elevated text-chrome">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#ff8a9b]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b81]" /> 0{i + 1}
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
  const keys = [
    { k: "content", Icon: IconVideo, Art: ArtContent },
    { k: "digital", Icon: IconGlobe, Art: ArtDigital },
    { k: "ai", Icon: IconSpark, Art: ArtAi },
  ] as const;
  return (
    <Section id="services">
      <SectionHeader index="02" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {keys.map(({ k, Icon, Art }, i) => (
          <Reveal key={k} delay={i * 0.06}>
            <article className="glass hud lift group flex h-full flex-col overflow-hidden">
              <div className="relative h-40 border-b border-line bg-bg/40">
                <Art />
                <span className="absolute start-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted" dir="ltr">
                  SRV—0{i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* Line-art schematics for each service */
function ArtContent() {
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <g fill="none" stroke="#2A3550">
        <rect x="112" y="26" width="64" height="112" rx="10" />
        <rect x="186" y="44" width="64" height="94" rx="10" />
        <rect x="58" y="52" width="44" height="78" rx="8" />
      </g>
      <rect x="112" y="26" width="64" height="112" rx="10" fill="#0F1626" stroke="#C9D1E0" strokeOpacity=".5" />
      <path d="M138 72v20l17-10z" fill="#C9D1E0" />
      <path d="M122 124h44" stroke="#2A3550" strokeWidth="2" strokeLinecap="round" />
      <path d="M122 124h18" stroke="#2F6BFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="166" cy="38" r="3" fill="#ff4d5e" />
      <g stroke="#2A3550" strokeDasharray="2 4"><path d="M20 80h30M260 90h44" /></g>
    </svg>
  );
}
function ArtDigital() {
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <g fill="none" stroke="#2A3550">
        <rect x="70" y="30" width="180" height="104" rx="8" />
        <path d="M70 48h180" />
        <rect x="86" y="62" width="70" height="56" rx="4" />
        <path d="M168 66h66M168 78h50M168 90h58" />
      </g>
      <circle cx="80" cy="39" r="2" fill="#2A3550" />
      <circle cx="88" cy="39" r="2" fill="#2A3550" />
      <rect x="168" y="102" width="44" height="14" rx="4" fill="#2F6BFF" />
      <path d="M121 76c-8 0-14 6-14 13 0 10 14 21 14 21s14-11 14-21c0-7-6-13-14-13z" fill="#0F1626" stroke="#C9D1E0" strokeOpacity=".6" />
      <circle cx="121" cy="89" r="4" fill="#00E5FF" />
    </svg>
  );
}
function ArtAi() {
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <g fill="none" stroke="#2A3550">
        <path d="M60 50h70l30 30h40M60 110h70l30-30M200 80h60" />
        <rect x="40" y="40" width="40" height="20" rx="6" />
        <rect x="40" y="100" width="40" height="20" rx="6" />
        <rect x="244" y="68" width="40" height="24" rx="6" />
      </g>
      <circle cx="160" cy="80" r="22" fill="#0F1626" stroke="#2F6BFF" />
      <path d="M160 68l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#C9D1E0" />
      <circle cx="200" cy="80" r="3" fill="#00E5FF" />
      <circle cx="130" cy="50" r="2.5" fill="#C9D1E0" />
      <circle cx="130" cy="110" r="2.5" fill="#C9D1E0" />
    </svg>
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
      <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <span aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-line lg:block" />
        <span aria-hidden className="absolute start-5 top-0 h-full w-px bg-line sm:hidden" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <li className="relative list-none ps-14 sm:ps-0">
              <div className="absolute start-0 top-0 sm:static flex items-center gap-3">
                <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs ${i === 0 ? "border-primary bg-primary text-white" : "border-line bg-bg text-chrome"}`}>
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-1.5 sm:mt-6 text-2xl font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] leading-relaxed text-muted">{s.text}</p>
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
      <SectionHeader index="06" label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const featured = i === 1;
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className={`glass relative flex h-full flex-col p-6 sm:p-7 ${featured ? "!border-primary/60 !bg-elevated/70 shadow-[0_30px_80px_-30px_rgba(47,107,255,0.45)]" : "hud"}`}>
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
