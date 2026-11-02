export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export type FigureName = "loading" | "route" | "port";

export interface Item {
  title: string;
  description: string;
  meta?: string;
  href?: string;
  body?: string;
  figure?: FigureName;
  current?: boolean;
  period?: string;
}

export interface Section {
  id: string;
  title: string;
  intro?: string;
  timeline?: boolean;
  items: Item[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  name: string;
  greeting: string;
  role: string;
  intro: string;
  switchLabel: string;
  sections: Section[];
  figures: Record<FigureName, string>;
  label: {
    title: string;
    priority: string;
    shipTo: string;
    service: string;
    note: string;
    email: string;
    emailCta: string;
    linkedinCta: string;
    href: string;
  };
}
