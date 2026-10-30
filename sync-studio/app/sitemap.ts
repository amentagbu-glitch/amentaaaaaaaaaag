import type { MetadataRoute } from "next";
import { localePath } from "@/lib/site";

const paths = ["", "/services", "/work", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: localePath("fr", p),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
    alternates: { languages: { fr: localePath("fr", p), en: localePath("en", p), ar: localePath("ar", p) } },
  }));
}
