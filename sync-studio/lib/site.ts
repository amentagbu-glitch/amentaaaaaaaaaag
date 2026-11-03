// Central place for business details. Replace the placeholders marked TODO.
export const site = {
  name: "Sync Studio",
  // Final domain if set, otherwise the address Netlify gives the site (URL is set by Netlify at build time)
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://syncstudio.ma").replace(/\/$/, ""),
  email: "hello@syncstudio.ma",
  city: "Agadir",
  country: "Morocco",
  // TODO: real WhatsApp number, digits only, international format (e.g. 2126XXXXXXXX)
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
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

export function whatsappLink(text?: string) {
  const number = site.whatsapp || "212000000000"; // placeholder until NEXT_PUBLIC_WHATSAPP_NUMBER is set
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${number}${q}`;
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
