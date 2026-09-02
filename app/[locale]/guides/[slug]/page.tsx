import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHROME_STORE_URL } from "@/lib/config";
import { getGuide, getGuides, GUIDE_SLUGS } from "@/lib/guides";
import { getGuideCatalogCopy } from "@/lib/guides/catalog";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates, getLocalizedHref } from "@/lib/routing";

const BASE_URL = "https://lectoroai.com";
const PUBLISHED_AT = "2026-09-02T00:00:00.000Z";

export function generateStaticParams() {
    return LOCALES.flatMap((locale) =>
        GUIDE_SLUGS.map((slug) => ({ locale, slug })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    if (!isLocale(locale) || !GUIDE_SLUGS.includes(slug as never)) return {};

    const guide = getGuide(locale, slug);
    const path = `/guides/${guide.slug}`;
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;
    const image =
        guide.slug === "learn-language-netflix-youtube"
            ? "/showcase/1.jpg"
            : "/showcase/5.jpg";

    return {
        title: guide.title,
        description: guide.description,
        alternates: {
            canonical,
            languages: getLanguageAlternates(BASE_URL, path),
        },
        openGraph: {
            type: "article",
            url: canonical,
            title: guide.title,
            description: guide.description,
            locale: LOCALE_CONFIG[locale].openGraph,
            publishedTime: PUBLISHED_AT,
            modifiedTime: PUBLISHED_AT,
            authors: ["Lectoro AI"],
            images: [
                { url: image, width: 1280, height: 800, alt: guide.title },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: guide.title,
            description: guide.description,
            images: [image],
        },
    };
}

export default async function GuidePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    if (!isLocale(locale)) notFound();

    const guide = getGuide(locale, slug);
    const guides = getGuides(locale);
    const catalogCopy = getGuideCatalogCopy(locale);
    const dict = await getDictionary(locale);
    const path = `/guides/${guide.slug}`;
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;
    const homeHref = getLocalizedHref("/", locale);
    const guidesHref = getLocalizedHref("/guides", locale);
    const relatedSlug = GUIDE_SLUGS.find((item) => item !== guide.slug)!;
    const relatedGuide = guides[relatedSlug];
    const relatedHref = getLocalizedHref(`/guides/${relatedSlug}`, locale);
    const image =
        guide.slug === "learn-language-netflix-youtube"
            ? "/showcase/1.jpg"
            : "/showcase/5.jpg";

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${canonical}#article`,
                headline: guide.title,
                description: guide.description,
                image: `${BASE_URL}${image}`,
                datePublished: PUBLISHED_AT,
                dateModified: PUBLISHED_AT,
                inLanguage: locale,
                mainEntityOfPage: canonical,
                author: { "@type": "Organization", name: "Lectoro AI" },
                publisher: {
                    "@type": "Organization",
                    name: "Lectoro AI",
                    logo: {
                        "@type": "ImageObject",
                        url: `${BASE_URL}/icon.png`,
                    },
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: guide.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
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
                        name: catalogCopy.label,
                        item: `${BASE_URL}${guidesHref}`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: guide.title,
                        item: canonical,
                    },
                ],
            },
        ],
    };

    return (
        <article className="pb-24 pt-10 sm:pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />

            <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-7 flex items-center gap-2 text-xs text-slate-400"
                >
                    <Link
                        href={homeHref}
                        className="transition hover:text-white"
                    >
                        {dict.privacy.breadcrumbHome}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <Link
                        href={guidesHref}
                        className="transition hover:text-white"
                    >
                        {catalogCopy.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="truncate text-indigo-300">
                        {guide.title}
                    </span>
                </nav>

                <p className="mb-4 text-xs font-bold uppercase text-indigo-300">
                    {guide.eyebrow}
                </p>
                <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
                    {guide.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                    {guide.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                    <span>{guide.updatedAt}</span>
                    <span>{guide.readingTime}</span>
                </div>
            </header>

            <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
                <Image
                    src={image}
                    alt={guide.title}
                    width={1280}
                    height={800}
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="aspect-16/10 w-full rounded-lg border border-white/10 object-cover shadow-2xl shadow-indigo-950/50"
                />
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,720px)] lg:px-8">
                <aside className="hidden lg:block">
                    <nav
                        aria-label="Table of contents"
                        className="sticky top-28 border-l border-white/10 pl-5"
                    >
                        <ul className="space-y-3 text-sm text-slate-400">
                            {guide.sections.map((section, index) => (
                                <li key={section.heading}>
                                    <a
                                        href={`#section-${index + 1}`}
                                        className="transition hover:text-white"
                                    >
                                        {section.heading}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className="min-w-0">
                    <p className="text-lg leading-8 text-slate-200">
                        {guide.intro}
                    </p>

                    <div className="mt-12 space-y-14">
                        {guide.sections.map((section, sectionIndex) => (
                            <section
                                id={`section-${sectionIndex + 1}`}
                                key={section.heading}
                                className="scroll-mt-28"
                            >
                                <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                                    {section.heading}
                                </h2>
                                <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                                    {section.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>

                                {section.bullets && (
                                    <ul className="mt-6 space-y-3 border-l-2 border-indigo-500/60 pl-5 text-slate-200">
                                        {section.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.steps && (
                                    <ol className="mt-7 space-y-6">
                                        {section.steps.map(
                                            (step, stepIndex) => (
                                                <li
                                                    key={step.title}
                                                    className="grid grid-cols-[36px_1fr] gap-4"
                                                >
                                                    <span className="flex size-9 items-center justify-center rounded-md bg-indigo-500/20 text-sm font-bold text-indigo-200">
                                                        {stepIndex + 1}
                                                    </span>
                                                    <div>
                                                        <h3 className="font-display text-lg font-bold text-white">
                                                            {step.title}
                                                        </h3>
                                                        <p className="mt-1 leading-7 text-slate-300">
                                                            {step.text}
                                                        </p>
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    </ol>
                                )}
                            </section>
                        ))}
                    </div>

                    <section className="mt-16 border-t border-white/10 pt-12">
                        <h2 className="font-display text-2xl font-bold text-white">
                            FAQ
                        </h2>
                        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                            {guide.faq.map((item) => (
                                <div key={item.question} className="py-6">
                                    <h3 className="font-display text-lg font-bold text-white">
                                        {item.question}
                                    </h3>
                                    <p className="mt-2 leading-7 text-slate-300">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-14 border-y border-indigo-400/25 bg-indigo-500/8 px-5 py-8 sm:px-8">
                        <h2 className="font-display text-2xl font-bold text-white">
                            {guide.ctaTitle}
                        </h2>
                        <p className="mt-3 leading-7 text-slate-300">
                            {guide.ctaText}
                        </p>
                        <Link
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-400"
                        >
                            {guide.ctaButton}
                        </Link>
                    </section>

                    <Link
                        href={relatedHref}
                        className="group mt-12 block border-b border-white/10 pb-7"
                    >
                        <span className="text-xs font-bold uppercase text-indigo-300">
                            {guide.relatedLabel}
                        </span>
                        <span className="mt-2 block font-display text-xl font-bold text-white transition group-hover:text-indigo-200">
                            {relatedGuide.title}
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
