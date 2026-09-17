import "server-only";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/types";
import { enGuides } from "./en";
import { jaGuides } from "./ja";
import { deGuides } from "./de";
import { koGuides } from "./ko";
import { frGuides } from "./fr";
import { nlGuides } from "./nl";
import { plGuides } from "./pl";
import { esGuides } from "./es";
import { itGuides } from "./it";
import { csGuides } from "./cs";
import { ptGuides } from "./pt";
import { GUIDE_SLUGS, type GuideContent, type GuideDictionary } from "./types";

const guideDictionaries: Record<Locale, GuideDictionary> = {
    en: enGuides,
    ja: jaGuides,
    de: deGuides,
    ko: koGuides,
    fr: frGuides,
    nl: nlGuides,
    pl: plGuides,
    es: esGuides,
    it: itGuides,
    cs: csGuides,
    pt: ptGuides,
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
