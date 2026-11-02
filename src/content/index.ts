import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

export * from "./types";
