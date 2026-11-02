export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export type FigureName = "route-margin";

export interface Item {
  title: string;
  description: string;
  meta?: string;
  href?: string;
  figure?: FigureName;
}

export interface Section {
  id: string;
  title: string;
  intro?: string;
  items: Item[];
}

export interface RouteMarginCopy {
  fig: string;
  title: string;
  hint: string;
  readout: string;
  label: string;
  margin: string;
  pallets: string;
  keys: { revenue: string; cost: string; margin: string };
  caption: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  name: string;
  role: string;
  switchLabel: string;
  sections: Section[];
  figures: { routeMargin: RouteMarginCopy };
}
