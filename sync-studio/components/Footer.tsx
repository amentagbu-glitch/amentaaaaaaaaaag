import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconArrow, IconFacebook, IconInstagram, IconLinkedIn, IconTikTok, IconWhatsApp } from "./icons";
import { CommandTrigger } from "./v2/CommandTrigger";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const f2 = useTranslations("v2.footer2");
  const w = useTranslations("whatsapp");
  const socials = [
    { href: site.socials.instagram, label: "Instagram", Icon: IconInstagram },
    { href: site.socials.tiktok, label: "TikTok", Icon: IconTikTok },
    { href: site.socials.facebook, label: "Facebook", Icon: IconFacebook },
    { href: site.socials.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line/70 pb-28 pt-16 sm:pb-16">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 border-b border-line/60 pb-14 lg:flex-row lg:items-end">
          <p className="max-w-[16ch] font-heading text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{f2("cta")}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" data-magnetic className="btn btn-primary btn-pill">
              {f2("audit")} <span className="btn-arrow"><IconArrow className="h-4 w-4 rtl:-scale-x-100" /></span>
            </Link>
            <a href={whatsappLink(w("prefill"))} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-secondary btn-pill">
              <IconWhatsApp className="h-4 w-4 text-wa" /> WhatsApp
            </a>
            <CommandTrigger full className="!h-12" />
          </div>
        </div>
      </div>
      <div className="container-x mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="footer" />
          <p className="mt-4 max-w-xs text-muted">{t("tagline")}</p>
          <LanguageSwitcher className="mt-6" />
        </div>
        <div>
          <p className="label-mono">{t("nav")}</p>
          <ul className="mt-4 space-y-2.5">
            {(["services", "work", "about", "contact"] as const).map((k) => (
              <li key={k}>
                <Link href={`/${k}`} className="text-chrome transition-colors hover:text-text">
                  {n(k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono">{t("contact")}</p>
          <ul className="mt-4 space-y-2.5 text-chrome">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-text" dir="ltr">
                {site.email}
              </a>
            </li>
            <li>{t("location")}</li>
          </ul>
          <p className="label-mono mt-8">{t("follow")}</p>
          <ul className="mt-4 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-chrome hover:text-text"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x mt-16" aria-hidden>
        <p className="outline-text select-none font-heading text-[13vw] font-medium leading-[0.95] tracking-[-0.05em] lg:text-[9.5rem]">{t("tagline")}</p>
      </div>
      <div className="container-x mt-10 flex flex-col gap-2 border-t border-line/60 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Sync Studio. {t("rights")}
        </p>
        <p className="label-mono">{f2("madeIn")} · {t("beta")}</p>
      </div>
    </footer>
  );
}
