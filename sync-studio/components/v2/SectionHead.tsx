/** v2 section header: big outlined index number, label, title and optional subtitle. */
export function SectionHead({ index, label, title, subtitle, className = "" }: { index: string; label: string; title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`grid items-end gap-x-8 gap-y-4 md:grid-cols-[auto_1fr] ${className}`}>
      <span className="sec-index" aria-hidden dir="ltr">{index}</span>
      <div className="max-w-3xl">
        <p className="label-mono flex items-center gap-2.5">
          <span className="live-dot !h-1.5 !w-1.5" /> {label}
        </p>
        <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h2>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
