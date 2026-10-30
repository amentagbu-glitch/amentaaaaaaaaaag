import Script from "next/script";

/** Single, privacy-friendly analytics slot. Off unless NEXT_PUBLIC_ANALYTICS_SRC is set. */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  if (!src) return null;
  return <Script src={src} data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN} strategy="afterInteractive" defer />;
}
