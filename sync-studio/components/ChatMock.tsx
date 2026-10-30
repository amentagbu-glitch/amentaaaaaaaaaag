import { useTranslations } from "next-intl";
import { IconCheck } from "./icons";

const messages = [
  { from: "in", text: "Salam, wach kayna chi tabla l 4 had l3chiya?", time: "19:42" },
  { from: "out", text: "Wa 3alaykom salam! Ah kayna, f 20:30 wla 21:00. Achnu katfaddal?", time: "19:42" },
  { from: "in", text: "20:30 3afak", time: "19:43" },
  { from: "out", text: "Mzyan! Tsjjlat likom tabla l 4 f 20:30. Ghadi nsiftlik rappel 9bel b sa3a.", time: "19:43" },
] as const;

export function ChatMock() {
  const t = useTranslations("ai.chat");
  return (
    <figure className="w-full">
      <div className="glass overflow-hidden" dir="ltr">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-elevated font-heading text-sm font-semibold text-chrome">CA</span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-text">{t("name")}</p>
            <p className="text-xs text-muted">{t("status")}</p>
          </div>
          <span className="ms-auto inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-chrome">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("tag")}
          </span>
        </div>
        <ul className="space-y-2.5 px-4 py-5">
          {messages.map((m, i) => (
            <li key={i} className={`flex ${m.from === "out" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] rounded-[12px] px-3 py-2 text-[14px] leading-snug ${
                  m.from === "out" ? "rounded-br-[4px] border border-primary/30 bg-primary/15 text-text" : "rounded-bl-[4px] bg-elevated text-text"
                }`}
              >
                <p>{m.text}</p>
                <p className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-muted">
                  {m.time}
                  {m.from === "out" && <IconCheck className="h-3 w-3 text-accent" />}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-line px-4 py-3">
          <span className="h-9 flex-1 rounded-full border border-line bg-bg" />
          <span className="h-9 w-9 rounded-full bg-primary/80" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{t("caption")}</figcaption>
    </figure>
  );
}
