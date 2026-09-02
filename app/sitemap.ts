import type { MetadataRoute } from "next";
import { PREFIXED_LOCALES, getLanguageAlternates } from "@/lib/routing";
import { GUIDE_SLUGS } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://lectoroai.com";
    const homepageUpdated = new Date("2026-09-01");
    const legalPagesUpdated = new Date("2026-08-26");
    const guidesUpdated = new Date("2026-09-02");
    const languageAlternates = (path = "") => ({
        languages: getLanguageAlternates(baseUrl, path),
    });

    const englishRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: homepageUpdated,
            changeFrequency: "weekly",
            priority: 1.0,
            alternates: languageAlternates(),
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: legalPagesUpdated,
            changeFrequency: "yearly",
            priority: 0.2,
            alternates: languageAlternates("/privacy"),
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: legalPagesUpdated,
            changeFrequency: "yearly",
            priority: 0.2,
            alternates: languageAlternates("/terms"),
        },
    ];

    const localizedRoutes: MetadataRoute.Sitemap = PREFIXED_LOCALES.flatMap(
        (locale) => [
            {
                url: `${baseUrl}/${locale}`,
                lastModified: homepageUpdated,
                changeFrequency: "weekly" as const,
                priority: 0.9,
                alternates: languageAlternates(),
            },
            {
                url: `${baseUrl}/${locale}/privacy`,
                lastModified: legalPagesUpdated,
                changeFrequency: "yearly" as const,
                priority: 0.2,
                alternates: languageAlternates("/privacy"),
            },
            {
                url: `${baseUrl}/${locale}/terms`,
                lastModified: legalPagesUpdated,
                changeFrequency: "yearly" as const,
                priority: 0.2,
                alternates: languageAlternates("/terms"),
            },
        ],
    );

    const guideRoutes: MetadataRoute.Sitemap = [
        "",
        ...PREFIXED_LOCALES,
    ].flatMap((locale) =>
        GUIDE_SLUGS.map((slug) => {
            const path = `/guides/${slug}`;
            return {
                url: `${baseUrl}${locale ? `/${locale}` : ""}${path}`,
                lastModified: guidesUpdated,
                changeFrequency: "monthly" as const,
                priority: 0.8,
                alternates: languageAlternates(path),
            };
        }),
    );

    const guideCatalogRoutes: MetadataRoute.Sitemap = [
        "",
        ...PREFIXED_LOCALES,
    ].map((locale) => ({
        url: `${baseUrl}${locale ? `/${locale}` : ""}/guides`,
        lastModified: guidesUpdated,
        changeFrequency: "weekly" as const,
        priority: 0.85,
        alternates: languageAlternates("/guides"),
    }));

    return [
        ...englishRoutes,
        ...localizedRoutes,
        ...guideCatalogRoutes,
        ...guideRoutes,
    ];
}
