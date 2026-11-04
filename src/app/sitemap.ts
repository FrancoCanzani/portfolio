import type { MetadataRoute } from "next";
import { locales } from "@/content/types";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}`]));
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
