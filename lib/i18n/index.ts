import "server-only";
import { notFound } from "next/navigation";
import type { Dict, Locale } from "./types";
import { en } from "./en";
import { ja } from "./ja";
import { de } from "./de";
import { ko } from "./ko";
import { fr } from "./fr";
import { nl } from "./nl";
import { pl } from "./pl";
import { es } from "./es";
import { it } from "./it";
import { cs } from "./cs";
import { pt } from "./pt";

const dictionaries: Record<Locale, Dict> = {
    en,
    ja,
    de,
    ko,
    fr,
    nl,
    pl,
    es,
    it,
    cs,
    pt,
};

export function isLocale(value: string): value is Locale {
    return value in dictionaries;
}

export async function getDictionary(locale: string): Promise<Dict> {
    if (!isLocale(locale)) notFound();
    return dictionaries[locale];
}

export type { Dict, Locale };
export { LOCALES } from "./types";
