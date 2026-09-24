import type { Locale } from "@/lib/i18n/types";

export type GuideSlug = string;

export interface GuideMeta {
    slug: string;
    image: string;
    category: string;
    publishedAt: string;
    updatedAt: string;
    readingTime: string;
    featured?: boolean;
}

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
    category?: string;
    author?: string;
}

export type GuideDictionary = Record<string, GuideContent>;
