import "server-only";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/types";
import { enGuides } from "./en";
import { plGuides } from "./pl";
import { deGuides } from "./de";
import { esGuides } from "./es";
import { jaGuides } from "./ja";
import { koGuides } from "./ko";
import { frGuides } from "./fr";
import { ptBRGuides } from "./pt-BR";
import { esMXGuides } from "./es-MX";
import { hiGuides } from "./hi";
import { GUIDE_SLUGS, type GuideContent, type GuideDictionary } from "./types";

const guideDictionaries: Record<Locale, GuideDictionary> = {
    en: enGuides,
    pl: plGuides,
    de: deGuides,
    es: esGuides,
    ja: jaGuides,
    ko: koGuides,
    fr: frGuides,
    "pt-BR": ptBRGuides,
    "es-MX": esMXGuides,
    hi: hiGuides,
};

export function isGuideSlug(value: string): value is GuideContent["slug"] {
    return GUIDE_SLUGS.some((slug) => slug === value);
}

export function getGuides(locale: Locale): GuideDictionary {
    return guideDictionaries[locale];
}

export function getGuide(locale: Locale, slug: string): GuideContent {
    if (!isGuideSlug(slug)) notFound();
    return guideDictionaries[locale][slug];
}

export { GUIDE_SLUGS } from "./types";
export type { GuideContent, GuideSlug } from "./types";
