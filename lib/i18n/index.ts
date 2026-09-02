import "server-only";
import { notFound } from "next/navigation";
import type { Dict, Locale } from "./types";
import { en } from "./en";
import { pl } from "./pl";
import { de } from "./de";
import { es } from "./es";
import { ja } from "./ja";

const dictionaries: Record<Locale, Dict> = { en, pl, de, es, ja };

export function isLocale(value: string): value is Locale {
    return value in dictionaries;
}

export async function getDictionary(locale: string): Promise<Dict> {
    if (!isLocale(locale)) notFound();
    return dictionaries[locale];
}

export type { Dict, Locale };
export { LOCALES } from "./types";
