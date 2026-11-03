import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site, alternates, localePath } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";
import Script from "next/script";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], variable: "--font-plex-arabic", display: "swap", weight: ["400", "500", "600", "700"] });

const THEME_INIT = `try{var d=document.documentElement,s=null;try{s=localStorage.getItem("ss-theme")}catch(e){}var h=d.getAttribute("data-theme");var l=s?s==="light":(h==="light"||h==="dark")?h==="light":window.matchMedia("(prefers-color-scheme: light)").matches;if(l)d.setAttribute("data-ss-theme","light")}catch(e){}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#070B14", colorScheme: "dark light" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("home.title"), template: `%s · Sync Studio` },
    description: t("home.description"),
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      siteName: "Sync Studio",
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
      url: localePath(locale),
    },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/brand/favicon-dark-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
        { url: "/brand/favicon-bright-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
        { url: "/brand/icon-circle.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sync Studio",
    description: t("home.description"),
    url: localePath(locale),
    email: site.email,
    logo: `${site.url}/brand/logo-official.png`,
    founder: { "@type": "Person", name: "Oussama Amentag", jobTitle: "Founder, videographer & visual designer", image: `${site.url}/team/oussama-amentag.jpg` },
    image: `${site.url}/brand/logo-official.png`,
    ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Agadir", addressRegion: "Souss-Massa", addressCountry: "MA" },
    areaServed: { "@type": "Country", name: "Morocco" },
    knowsLanguage: ["fr", "en", "ar"],
    priceRange: "MAD",
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        {/* Before the page paints: the saved choice if any, otherwise the device setting */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <div className="progress-bar fixed inset-x-0 top-0 z-[70] h-px bg-primary" aria-hidden />
        <NextIntlClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script src="/fx.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
