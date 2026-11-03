import { useTranslations } from "next-intl";
import { IconMoon, IconSun } from "./icons";

/** Switches dark / light mode. The click is handled by /fx.js, so it also works on static copies of the site. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label={t("theme")}
      title={t("theme")}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-bg/40 text-chrome transition-colors hover:text-text ${className}`}
    >
      <IconSun className="only-dark h-[18px] w-[18px]" />
      <IconMoon className="only-light h-[18px] w-[18px]" />
    </button>
  );
}
