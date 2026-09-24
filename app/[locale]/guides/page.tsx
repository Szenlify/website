import "./guides.css";
import { ArrowUpRight, ArrowRight, Clock3, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideCatalogCopy } from "@/lib/guides/catalog";
import { getGuides, getGuideMeta, GUIDE_IMAGES, GUIDE_SLUGS } from "@/lib/guides";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates, getLocalizedHref } from "@/lib/routing";

const BASE_URL = "https://lectoroai.com";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const copy = getGuideCatalogCopy(locale);
    const path = "/guides";
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;

    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical,
            languages: getLanguageAlternates(BASE_URL, path),
        },
        openGraph: {
            type: "website",
            url: canonical,
            title: copy.title,
            description: copy.description,
            locale: LOCALE_CONFIG[locale].openGraph,
            images: [
                {
                    url: "/showcase/1.jpg",
                    width: 1280,
                    height: 800,
                    alt: copy.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: copy.title,
            description: copy.description,
            images: ["/showcase/1.jpg"],
        },
    };
}

export default async function GuidesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const copy = getGuideCatalogCopy(locale);
    const guides = getGuides(locale);
    const dict = await getDictionary(locale);
    const homeHref = getLocalizedHref("/", locale);
    const guidesHref = getLocalizedHref("/guides", locale);
    const canonical = `${BASE_URL}${guidesHref}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${canonical}#collection`,
                url: canonical,
                name: copy.title,
                description: copy.description,
                inLanguage: locale,
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: GUIDE_SLUGS.filter((slug) => Boolean(guides[slug])).map((slug, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        url: `${BASE_URL}${getLocalizedHref(`/guides/${slug}`, locale)}`,
                        name: guides[slug].title,
                    })),
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: dict.privacy.breadcrumbHome,
                        item: `${BASE_URL}${homeHref}`,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: copy.label,
                        item: canonical,
                    },
                ],
            },
        ],
    };

    return (
        <section className="guides-library">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />

            <div className="guides-shell">
                <nav
                    aria-label="Breadcrumb"
                    className="guides-breadcrumb"
                >
                    <Link
                        href={homeHref}
                        className="transition hover:text-white"
                    >
                        {dict.privacy.breadcrumbHome}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{copy.label}</span>
                </nav>

                <header className="guides-header">
                    <p className="guides-eyebrow">
                        <span aria-hidden="true" />
                        {copy.eyebrow}
                    </p>
                    <div className="guides-intro">
                        <h1>{copy.title}</h1>
                        <p>{copy.description}</p>
                    </div>
                </header>

                <div className="guides-section-label">
                    <span>{copy.label}</span>
                    <span className="guides-count">{String(GUIDE_SLUGS.length).padStart(2, "0")}</span>
                </div>

                <div className="guides-list">
                    {GUIDE_SLUGS.map((slug, index) => {
                        const guide = guides[slug];
                        if (!guide) return null;
                        const meta = getGuideMeta(slug);
                        const href = getLocalizedHref(`/guides/${slug}`, locale);
                        const categoryLabel = meta?.category || guide.eyebrow;

                        return (
                            <article key={slug} className="guide-entry">
                                <Link href={href} className="guide-link group">
                                    <div className="guide-cover">
                                        <Image
                                            src={GUIDE_IMAGES[slug] || meta?.image || "/showcase/11.jpg"}
                                            alt={guide.title}
                                            width={1280}
                                            height={800}
                                            loading={index === 0 ? "eager" : "lazy"}
                                            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1100px) 34vw, 352px"
                                        />
                                        <span className="guide-cover-arrow" aria-hidden="true">
                                            <ArrowUpRight size={20} />
                                        </span>
                                    </div>
                                    <div className="guide-copy">
                                        <div className="guide-meta">
                                            <span className="guide-category-tag">{categoryLabel}</span>
                                            <span className="guide-reading-time">
                                                <Clock3 size={13} aria-hidden="true" />
                                                {meta?.readingTime || guide.readingTime}
                                            </span>
                                        </div>
                                        <h2>{guide.title}</h2>
                                        <p>{guide.description}</p>
                                        <span className="guide-read">
                                            {copy.readGuide}
                                            <ArrowRight size={16} aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
