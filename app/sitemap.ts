import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://lectoroai.com";
    const homepageUpdated = new Date("2026-09-01");
    const legalPagesUpdated = new Date("2026-08-26");
    const locales = ["pl", "de", "es"];
    const languageAlternates = (path = "") => ({
        languages: {
            "x-default": `${baseUrl}${path}`,
            en: `${baseUrl}${path}`,
            pl: `${baseUrl}/pl${path}`,
            de: `${baseUrl}/de${path}`,
            es: `${baseUrl}/es${path}`,
        },
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

    const localizedRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
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
    ]);

    return [...englishRoutes, ...localizedRoutes];
}
