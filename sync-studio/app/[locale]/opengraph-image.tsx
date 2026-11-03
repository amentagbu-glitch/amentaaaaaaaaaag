import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "@/i18n/routing";

export const alt = "Sync Studio · Offline, online, in sync.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built once per language at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const taglines: Record<string, [string, string]> = {
  fr: ["Hors ligne, en ligne,", "en phase."],
  en: ["Offline, online,", "in sync."],
  ar: ["Offline, online,", "in sync."],
};
const sublines: Record<string, string> = {
  fr: "Vidéo · Sites web · Automatisation IA",
  en: "Video · Websites · AI automation",
  ar: "Video · Websites · AI automation",
};

export default async function OG({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const logo = await readFile(join(process.cwd(), "public/brand/logo-stacked.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#070B14", padding: "72px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: -260, left: -160, width: 640, height: 640, borderRadius: 9999, background: "#2F6BFF", opacity: 0.16, filter: "blur(120px)" }} />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#8FA3C7", textTransform: "uppercase" }}>Agadir · Morocco</div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08 }}>
            <span style={{ color: "#8FA3C7" }}>{(taglines[locale] ?? taglines.fr)[0]}</span>
            <span style={{ color: "#E6EAF2" }}>{(taglines[locale] ?? taglines.fr)[1]}</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#8FA3C7" }}>{sublines[locale] ?? sublines.fr}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={380} height={278} alt="" />
      </div>
    ),
    size,
  );
}
