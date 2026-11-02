export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export type IconName = "truck" | "route" | "chart" | "languages" | "graduation" | "award" | "code" | "linkedin" | "sparkles";

export interface Item {
  icon: IconName;
  title: string;
  description: string;
  meta?: string;
  href?: string;
}

export interface Section {
  id: string;
  title: string;
  intro?: string;
  items: Item[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  name: string;
  role: string;
  summary: string[];
  indexLabel: string;
  switchLabel: string;
  sections: Section[];
  footer: string;
}
