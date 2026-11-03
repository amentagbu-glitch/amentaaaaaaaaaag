// Central place for business details. Replace the placeholders marked TODO.
export const site = {
  name: "Sync Studio",
  // Final domain if set, otherwise the address Netlify gives the site (URL is set by Netlify at build time)
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://syncstudio.ma").replace(/\/$/, ""),
  email: "hello@syncstudio.ma",
  city: "Agadir",
  country: "Morocco",
  // WhatsApp, international format, digits only. NEXT_PUBLIC_WHATSAPP_NUMBER overrides it.
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212614686769").replace(/\D/g, ""),
  // TODO: real social links
  socials: {
    instagram: "#",
    tiktok: "#",
    facebook: "#",
    linkedin: "#",
  },
  // Set to true once real video testimonials exist
  showTestimonials: false,
};

/** "212614686769" -> "+212 6 14 68 67 69" (Moroccan numbers), otherwise "+<digits>" */
export function whatsappDisplay() {
  const d = site.whatsapp;
  const m = d.match(/^212(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/);
  return m ? `+212 ${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}` : `+${d}`;
}

export function whatsappLink(text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsapp}${q}`;
}

export function localePath(locale: string, path = "") {
  const clean = path === "/" ? "" : path;
  return locale === "fr" ? `${site.url}${clean || "/"}` : `${site.url}/${locale}${clean}`;
}

export function alternates(locale: string, path = "") {
  return {
    canonical: localePath(locale, path),
    languages: {
      fr: localePath("fr", path),
      en: localePath("en", path),
      ar: localePath("ar", path),
      "x-default": localePath("fr", path),
    },
  };
}
