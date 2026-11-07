import { getLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";
import { IconArrow, IconCalendar, IconChat, IconGlobe, IconMail, IconMoon, IconPin, IconSpark, IconVideo, IconWhatsApp, IconChart, IconLayers } from "../icons";

type Item = { id: string; label: string; kw?: string; href?: string; anchor?: string; action?: string; external?: boolean; Icon: typeof IconArrow; copy?: string; done?: string };

/**
 * Command menu (Ctrl/Cmd + K). Rendered once in the layout, hidden until opened by /features.js.
 * Items are real links, so they work everywhere; the script adds search, keyboard navigation and actions.
 */
export async function CommandMenu() {
  const locale = await getLocale();
  const t = await getTranslations("v2.cmdk");
  const tw = await getTranslations("whatsapp");
  const p = (href: string) => getPathname({ href, locale });
  const groups: { id: string; title: string; items: Item[] }[] = [
    { id: "actions", title: t("groups.actions"), items: [
      { id: "score", label: t("items.score"), kw: "quiz test diagnostic score visibilite", href: `${p("/")}#score`, anchor: "score", Icon: IconChart },
      { id: "ai", label: t("items.ai"), kw: "ia ai bot chatbot whatsapp demo", href: `${p("/")}#ai-demo`, anchor: "ai-demo", Icon: IconSpark },
      { id: "builder", label: t("items.builder"), kw: "prix price offre offer tarif pack", href: `${p("/")}#builder`, anchor: "builder", Icon: IconLayers },
      { id: "audit", label: t("items.audit"), kw: "audit contact formulaire form", href: p("/contact"), Icon: IconCalendar },
      { id: "whatsapp", label: t("items.whatsapp"), kw: "whatsapp message chat", href: whatsappLink(tw("prefill")), external: true, Icon: IconWhatsApp },
      { id: "email", label: t("items.email"), kw: "email mail copier copy", action: "copy", copy: site.email, done: t("items.copied"), Icon: IconMail },
    ] },
    { id: "pages", title: t("groups.pages"), items: [
      { id: "home", label: t("items.home"), kw: "home accueil", href: p("/"), Icon: IconArrow },
      { id: "services", label: t("items.services"), href: p("/services"), Icon: IconArrow },
      { id: "work", label: t("items.work"), kw: "portfolio projets", href: p("/work"), Icon: IconArrow },
      { id: "about", label: t("items.about"), kw: "fondateur founder equipe team", href: p("/about"), Icon: IconArrow },
      { id: "contact", label: t("items.contact"), href: p("/contact"), Icon: IconArrow },
    ] },
    { id: "services", title: t("groups.services"), items: [
      { id: "content", label: t("items.content"), kw: "reels photo tournage", href: `${p("/services")}#content`, Icon: IconVideo },
      { id: "digital", label: t("items.digital"), kw: "google maps site web", href: `${p("/services")}#digital`, Icon: IconGlobe },
      { id: "aiService", label: t("items.aiService"), kw: "automatisation automation", href: `${p("/services")}#ai`, Icon: IconSpark },
    ] },
    { id: "work", title: t("groups.work"), items: [
      { id: "mous", label: t("items.mous"), kw: "mous shawarma restaurant rabat kebab", href: `${p("/work")}#mous`, Icon: IconPin },
      { id: "founder", label: t("items.founder"), kw: "oussama amentag", href: `${p("/about")}#founder`, Icon: IconChat },
    ] },
    { id: "settings", title: t("groups.settings"), items: [
      { id: "theme", label: t("items.theme"), kw: "dark light sombre clair theme", action: "theme", Icon: IconMoon },
      { id: "fr", label: t("items.fr"), kw: "langue language french", action: "lang:fr", Icon: IconGlobe },
      { id: "en", label: t("items.en"), kw: "langue language anglais", action: "lang:en", Icon: IconGlobe },
      { id: "ar", label: t("items.ar"), kw: "langue language arabe arabic", action: "lang:ar", Icon: IconGlobe },
    ] },
  ];
  return (
    <div id="cmdk" hidden>
      <div className="cmdk-overlay" data-cmdk-close />
      <div className="cmdk-panel" role="dialog" aria-modal="true" aria-label={t("trigger")}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
          <input
            data-cmdk-input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-autocomplete="list"
            placeholder={t("placeholder")}
            className="h-14 w-full bg-transparent text-base text-text placeholder:text-muted focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <div id="cmdk-list" role="listbox" data-cmdk-list data-lenis-prevent className="cmdk-list">
          {groups.map((g) => (
            <div key={g.id} data-cmdk-group role="group" aria-label={g.title}>
              <p className="cmdk-group-title">{g.title}</p>
              {g.items.map((it) => {
                const inner = (
                  <>
                    <span className="cmdk-icon"><it.Icon className="h-4 w-4" /></span>
                    <span data-cmdk-label className="min-w-0 flex-1 truncate">{it.label}</span>
                    {it.external ? <span className="kbd">↗</span> : <span className="cmdk-enter kbd">↵</span>}
                  </>
                );
                const common = { id: `cmdk-${it.id}`, role: "option", "aria-selected": false as const, "data-cmdk-item": "", "data-kw": it.kw, className: "cmdk-item" };
                return it.href ? (
                  <a key={it.id} {...common} href={it.href} data-anchor={it.anchor} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined}>
                    {inner}
                  </a>
                ) : (
                  <button key={it.id} type="button" {...common} data-action={it.action} data-copy={it.copy} data-done={it.done}>
                    {inner}
                  </button>
                );
              })}
            </div>
          ))}
          <p data-cmdk-empty hidden className="px-4 py-10 text-center text-sm text-muted">{t("empty")}</p>
        </div>
        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-muted">
          <span className="flex items-center gap-1.5"><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> {t("hints.navigate")}</span>
          <span className="flex items-center gap-1.5"><kbd className="kbd">↵</kbd> {t("hints.open")}</span>
          <span className="flex items-center gap-1.5"><kbd className="kbd">Esc</kbd> {t("hints.close")}</span>
        </div>
      </div>
    </div>
  );
}
