/* eslint-disable @next/next/no-img-element */
import { site } from "@/lib/site";

/**
 * Official Sync Studio logo files from /public/brand/, used unchanged (only resized for the web).
 * - header: horizontal logo on its own #070B14 background; "lighten" blending lets that
 *   background melt into the dark header without touching the logo itself.
 * - footer: stacked logo with transparent background.
 */
export function Logo({ variant = "header", className = "" }: { variant?: "header" | "footer"; className?: string }) {
  if (variant === "footer") {
    return (
      <img
        src="/brand/logo-stacked.png"
        alt={site.name}
        width={720}
        height={526}
        loading="lazy"
        className={`h-auto w-[190px] ${className}`}
      />
    );
  }
  return (
    <img
      src="/brand/logo-horizontal.png"
      alt={site.name}
      width={960}
      height={244}
      fetchPriority="high"
      className={`h-10 w-auto mix-blend-lighten ${className}`}
    />
  );
}
