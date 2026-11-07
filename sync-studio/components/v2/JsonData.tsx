/** Embeds data for /features.js as JSON (safe against closing the script tag). */
export function JsonData({ id, data }: { id: string; data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/json" id={id} dangerouslySetInnerHTML={{ __html: json }} />;
}
