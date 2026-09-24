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
import { GUIDE_SLUGS, GUIDE_METADATA_MAP, GUIDE_REGISTRY } from "./registry";
import type { GuideContent, GuideDictionary, GuideMeta } from "./types";

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

export function isGuideSlug(value: string): boolean {
    return GUIDE_SLUGS.includes(value);
}

/**
 * Returns all guides for a locale.
 * If a guide is not yet translated in this locale, it automatically falls back
 * to the English guide so pages and catalogs NEVER crash or fail builds.
 */
export function getGuides(locale: Locale): Record<string, GuideContent> {
    const localDict = guideDictionaries[locale] || {};
    const fallbackDict = guideDictionaries.en;
    const merged: Record<string, GuideContent> = {};

    for (const slug of GUIDE_SLUGS) {
        if (localDict[slug]) {
            merged[slug] = localDict[slug];
        } else if (fallbackDict[slug]) {
            merged[slug] = fallbackDict[slug];
        }
    }

    return merged;
}

/**
 * Retrieves a single guide for a given locale with automatic English fallback.
 */
export function getGuide(locale: Locale, slug: string): GuideContent {
    if (!isGuideSlug(slug)) notFound();
    const guide = guideDictionaries[locale]?.[slug] || guideDictionaries.en?.[slug];
    if (!guide) notFound();
    return guide;
}

/**
 * Returns metadata (cover image, category, publication date) for a guide slug.
 */
export function getGuideMeta(slug: string): GuideMeta | undefined {
    return GUIDE_METADATA_MAP[slug];
}

export { GUIDE_SLUGS, GUIDE_REGISTRY, GUIDE_METADATA_MAP } from "./registry";
export { GUIDE_IMAGES } from "./registry";
export type { GuideContent, GuideSlug, GuideMeta, GuideSection } from "./types";
