import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations();
  const items = t.raw("marquee") as string[];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center whitespace-nowrap px-6 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-muted">
          <svg viewBox="0 0 12 12" className="me-6 h-2 w-2 text-line" aria-hidden>
            <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2z" fill="currentColor" />
          </svg>
          {it}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden border-y border-line/70 bg-surface/30 py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" dir="ltr">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
