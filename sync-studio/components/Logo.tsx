/* eslint-disable @next/next/no-img-element */
import { site } from "@/lib/site";

/**
 * Official Sync Studio logo files from /public/brand/, used unchanged (only resized for the web).
 * Each spot has a version for dark mode and one for light mode; CSS shows the right one.
 */
export function Logo({ variant = "header", className = "" }: { variant?: "header" | "footer"; className?: string }) {
  if (variant === "footer") {
    return (
      <span className={`inline-block ${className}`}>
        <img src="/brand/logo-stacked.png" alt={site.name} width={720} height={526} loading="lazy" className="only-dark h-auto w-[190px]" />
        <img src="/brand/logo-stacked-light.png" alt={site.name} width={720} height={526} loading="lazy" className="only-light h-auto w-[190px]" />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img src="/brand/logo-horizontal-on-dark.png" alt={site.name} width={640} height={151} fetchPriority="high" className="only-dark h-9 w-auto sm:h-10" />
      <img src="/brand/logo-horizontal-on-light.png" alt={site.name} width={640} height={151} className="only-light h-9 w-auto sm:h-10" />
    </span>
  );
}
