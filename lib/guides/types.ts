import type { Locale } from "@/lib/i18n/types";

export const GUIDE_SLUGS = [
    "learn-language-netflix-youtube",
    "video-flashcards-spaced-repetition",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export interface GuideSection {
    heading: string;
    paragraphs: string[];
    steps?: { title: string; text: string }[];
    bullets?: string[];
}

export interface GuideContent {
    locale: Locale;
    slug: GuideSlug;
    title: string;
    description: string;
    eyebrow: string;
    updatedAt: string;
    readingTime: string;
    intro: string;
    sections: GuideSection[];
    faq: { question: string; answer: string }[];
    relatedLabel: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
}

export type GuideDictionary = Record<GuideSlug, GuideContent>;
