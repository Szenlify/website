import type { GuideMeta } from "./types";

export const GUIDE_REGISTRY: GuideMeta[] = [
    {
        slug: "learn-language-netflix-youtube",
        image: "/showcase/11.jpg",
        category: "Immersion & Workflow",
        publishedAt: "2026-09-02T00:00:00.000Z",
        updatedAt: "September 2026",
        readingTime: "9 min read",
        featured: true,
    },
    {
        slug: "video-flashcards-spaced-repetition",
        image: "/showcase/5.jpg",
        category: "Spaced Repetition & SRS",
        publishedAt: "2026-09-02T00:00:00.000Z",
        updatedAt: "September 2026",
        readingTime: "8 min read",
        featured: true,
    },
    {
        slug: "dual-subtitles-netflix-youtube",
        image: "/guide/netflix.jpg",
        category: "Bilingual Subtitles Setup",
        publishedAt: "2026-09-02T00:00:00.000Z",
        updatedAt: "September 2026",
        readingTime: "7 min read",
        featured: false,
    },
    {
        slug: "language-reactor-alternative",
        image: "/showcase/4.jpg",
        category: "Comparison & Modern Tools",
        publishedAt: "2026-09-02T00:00:00.000Z",
        updatedAt: "September 2026",
        readingTime: "10 min read",
        featured: false,
    },
];

export const GUIDE_SLUGS = GUIDE_REGISTRY.map((g) => g.slug);

export const GUIDE_IMAGES: Record<string, string> = Object.fromEntries(
    GUIDE_REGISTRY.map((g) => [g.slug, g.image])
);

export const GUIDE_METADATA_MAP: Record<string, GuideMeta> = Object.fromEntries(
    GUIDE_REGISTRY.map((g) => [g.slug, g])
);
