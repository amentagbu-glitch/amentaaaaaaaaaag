import { ImageResponse } from "next/og";

export const alt = "Sync Studio · Offline, online, in sync.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const taglines: Record<string, string> = {
  fr: "Hors ligne, en ligne, en phase.",
  en: "Offline, online, in sync.",
  ar: "Offline, online, in sync.",
};

export default async function OG({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#070B14", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", top: -260, left: -160, width: 640, height: 640, borderRadius: 9999, background: "#2F6BFF", opacity: 0.18, filter: "blur(120px)" }} />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8FA3C7", textTransform: "uppercase" }}>Sync Studio · Agadir, Morocco</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#E6EAF2", letterSpacing: -2, lineHeight: 1.05 }}>{taglines[locale] ?? taglines.fr}</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#8FA3C7" }}>Video · Websites · AI automation</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", background: "#2F6BFF", color: "white", fontSize: 26, padding: "14px 26px", borderRadius: 12 }}>syncstudio.ma</div>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#00E5FF" }} />
        </div>
      </div>
    ),
    size,
  );
}
