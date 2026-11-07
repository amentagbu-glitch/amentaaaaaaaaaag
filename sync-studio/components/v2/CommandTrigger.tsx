import { useTranslations } from "next-intl";

/** Opens the command menu (handled by /features.js). "full" shows a search-field look with the shortcut. */
export function CommandTrigger({ full = false, className = "" }: { full?: boolean; className?: string }) {
  const t = useTranslations("v2.cmdk");
  const icon = (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </svg>
  );
  if (!full) {
    return (
      <button type="button" data-cmdk-open aria-label={t("trigger")} title={t("trigger")} className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-bg/40 text-chrome transition-colors hover:text-text ${className}`}>
        {icon}
      </button>
    );
  }
  return (
    <button type="button" data-cmdk-open className={`inline-flex h-10 items-center gap-2.5 rounded-[10px] border border-line bg-bg/40 ps-3 pe-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-text ${className}`}>
      {icon}
      <span>{t("trigger")}</span>
      <span className="ms-3 flex items-center gap-0.5" dir="ltr">
        <kbd className="kbd" data-kbd-mod>Ctrl</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}
