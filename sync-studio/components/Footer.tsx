import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconFacebook, IconInstagram, IconLinkedIn, IconTikTok } from "./icons";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const socials = [
    { href: site.socials.instagram, label: "Instagram", Icon: IconInstagram },
    { href: site.socials.tiktok, label: "TikTok", Icon: IconTikTok },
    { href: site.socials.facebook, label: "Facebook", Icon: IconFacebook },
    { href: site.socials.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line/70 pb-28 pt-16 sm:pb-16">
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-chrome transition-colors hover:border-chrome hover:text-text"
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
        <p className="label-mono">{t("beta")}</p>
      </div>
    </footer>
  );
}
