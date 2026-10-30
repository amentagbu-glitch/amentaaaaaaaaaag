import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

/**
 * Uses the final logo files from /public/brand/ once `site.hasLogoFiles` is true.
 * Until then it shows a clearly marked placeholder (never a redrawn logo).
 */
export function Logo({ className = "" }: { className?: string }) {
  const t = useTranslations();
  if (site.hasLogoFiles) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <Image src="/brand/logo-horizontal.svg" alt="Sync Studio" width={148} height={32} priority className="h-8 w-auto" />
        <Spark />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} data-placeholder="logo">
      <span
        className="inline-flex h-9 items-center rounded-lg border border-dashed border-chrome/50 px-2.5 font-heading text-[15px] font-semibold tracking-tight text-chrome"
        title={t("logoPlaceholder")}
        dir="ltr"
      >
        Sync Studio
        <span className="sr-only"> ({t("logoPlaceholder")})</span>
      </span>
      <Spark />
    </span>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 animate-spark text-accent" aria-hidden>
      <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2z" fill="currentColor" />
    </svg>
  );
}
