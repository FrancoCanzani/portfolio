import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { defaultLocale, getDictionary, hasLocale, locales, type Locale } from "@/content";
import { siteUrl } from "@/content/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const OG_LOCALE: Record<Locale, string> = { es: "es_ES", en: "en_GB" };

export const viewport: Viewport = { themeColor: "#fdfdfd" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta, name } = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    authors: [{ name }],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])), "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      type: "profile",
      firstName: "Franco",
      lastName: "Canzani",
      url: `/${lang}`,
      siteName: name,
      title: meta.title,
      description: meta.description,
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((locale) => locale !== lang).map((locale) => OG_LOCALE[locale]),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
