"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };
const names: Record<string, string> = { fr: "Français", en: "English", ar: "العربية" };

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <nav aria-label={t("language")} className={`inline-flex rounded-[10px] border border-line p-0.5 ${className}`} dir="ltr">
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={names[l]}
            className={`label-mono rounded-[8px] px-2.5 py-1.5 !text-[0.7rem] !tracking-[0.1em] transition-colors ${
              active ? "bg-elevated !text-text" : "hover:!text-text"
            }`}
          >
            {labels[l]}
          </Link>
        );
      })}
    </nav>
  );
}
