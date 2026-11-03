/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { clients } from "@/lib/clients";

/** "They trust us" strip with real client logos, plus an invitation tile. */
export function Clients() {
  const t = useTranslations("clients");
  return (
    <section className="py-12 sm:py-14">
      <div className="container-x flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-mono flex items-center gap-2.5">
          <span className="live-dot !h-1.5 !w-1.5" /> {t("label")}
        </p>
        <ul className="flex flex-wrap items-center gap-3">
          {clients.map((c) => (
            <li key={c.id}>
              <Link href={`/work#${c.id}`} className="flex h-16 items-center rounded-[14px] bg-white px-4 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5" aria-label={c.name}>
                <img src={c.logo} alt={c.name} width={c.logoSize.width} height={c.logoSize.height} loading="lazy" className="h-12 w-auto" />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="flex h-16 items-center rounded-[14px] border border-dashed border-line-strong px-5 text-sm text-muted transition-colors hover:border-primary hover:text-text">
              {t("yourLogo")}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
