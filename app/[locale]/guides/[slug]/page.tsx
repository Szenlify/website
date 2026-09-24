import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, Calendar, BookOpen, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { CHROME_STORE_URL } from "@/lib/config";
import { getGuide, getGuides, getGuideMeta, GUIDE_IMAGES, GUIDE_SLUGS } from "@/lib/guides";
import { getGuideCatalogCopy } from "@/lib/guides/catalog";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/types";
import { getLanguageAlternates, getLocalizedHref } from "@/lib/routing";

const BASE_URL = "https://lectoroai.com";
const DEFAULT_PUBLISHED_AT = "2026-09-02T00:00:00.000Z";

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
    if (!isLocale(locale) || !GUIDE_SLUGS.includes(slug)) return {};

    const guide = getGuide(locale, slug);
    if (!guide) return {};

    const meta = getGuideMeta(slug);
    const path = `/guides/${guide.slug}`;
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;
    const image = GUIDE_IMAGES[guide.slug] || meta?.image || "/showcase/1.jpg";

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
            publishedTime: meta?.publishedAt || DEFAULT_PUBLISHED_AT,
            modifiedTime: meta?.publishedAt || DEFAULT_PUBLISHED_AT,
            authors: [guide.author || "Lectoro AI"],
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
    if (!guide) notFound();

    const meta = getGuideMeta(slug);
    const guides = getGuides(locale);
    const catalogCopy = getGuideCatalogCopy(locale);
    const dict = await getDictionary(locale);
    const path = `/guides/${guide.slug}`;
    const canonical = `${BASE_URL}${getLocalizedHref(path, locale)}`;
    const homeHref = getLocalizedHref("/", locale);
    const guidesHref = getLocalizedHref("/guides", locale);
    const currentIndex = GUIDE_SLUGS.indexOf(guide.slug);
    const relatedSlug = GUIDE_SLUGS[(currentIndex + 1) % GUIDE_SLUGS.length];
    const relatedGuide = guides[relatedSlug] || guides[GUIDE_SLUGS[0]];
    const relatedHref = getLocalizedHref(`/guides/${relatedSlug}`, locale);
    const image = GUIDE_IMAGES[guide.slug] || meta?.image || "/showcase/1.jpg";
    const publishedDate = meta?.publishedAt || DEFAULT_PUBLISHED_AT;
    const categoryLabel = meta?.category || guide.category || guide.eyebrow;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${canonical}#article`,
                headline: guide.title,
                description: guide.description,
                image: `${BASE_URL}${image}`,
                datePublished: publishedDate,
                dateModified: publishedDate,
                inLanguage: locale,
                mainEntityOfPage: canonical,
                author: { "@type": "Organization", name: guide.author || "Lectoro AI" },
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
        <article className="pb-36 pt-12 sm:pt-20 text-slate-100">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />

            {/* Header Section */}
            <header className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                    <Link
                        href={homeHref}
                        className="transition hover:text-white"
                    >
                        {dict.privacy.breadcrumbHome}
                    </Link>
                    <span aria-hidden="true" className="text-slate-600">/</span>
                    <Link
                        href={guidesHref}
                        className="transition hover:text-white"
                    >
                        {catalogCopy.label}
                    </Link>
                    <span aria-hidden="true" className="text-slate-600">/</span>
                    <span className="truncate text-indigo-300 max-w-[240px] sm:max-w-none">
                        {guide.title}
                    </span>
                </nav>

                {/* Eyebrow & Category Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                        <Sparkles className="size-3" />
                        {categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock3 size={13} aria-hidden="true" className="text-slate-500" />
                        {meta?.readingTime || guide.readingTime}
                    </span>
                    <span className="text-slate-600 hidden sm:inline" aria-hidden="true">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={13} aria-hidden="true" className="text-slate-500" />
                        {guide.updatedAt}
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                    {guide.title}
                </h1>

                {/* Guide Description */}
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300/90 sm:text-xl">
                    {guide.description}
                </p>
            </header>

            {/* Featured Hero Image */}
            <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D18] shadow-2xl shadow-indigo-950/60">
                    <Image
                        src={image}
                        alt={guide.title}
                        width={1280}
                        height={800}
                        priority
                        sizes="(max-width: 1152px) 100vw, 1152px"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                    />
                </div>
            </div>

            {/* Main Content Layout with Sidebar */}
            <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
                {/* Sticky Table of Contents */}
                <aside className="hidden lg:block">
                    <nav
                        aria-label="Table of contents"
                        className="sticky top-28 space-y-3 rounded-2xl border border-white/10 bg-[#0d1224]/50 p-5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                            <BookOpen size={14} />
                            <span>Contents</span>
                        </div>
                        <ul className="space-y-2.5 text-xs font-medium text-slate-400 border-t border-white/5 pt-3">
                            {guide.sections.map((section, index) => (
                                <li key={section.heading}>
                                    <a
                                        href={`#section-${index + 1}`}
                                        className="block py-1 transition-colors hover:text-white hover:translate-x-1 duration-150"
                                    >
                                        {index + 1}. {section.heading}
                                    </a>
                                </li>
                            ))}
                            {guide.faq.length > 0 && (
                                <li>
                                    <a
                                        href="#faq"
                                        className="block py-1 transition-colors hover:text-white hover:translate-x-1 duration-150"
                                    >
                                        FAQ
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </aside>

                {/* Article Body */}
                <div className="min-w-0">
                    {/* Introduction lead paragraph */}
                    <div className="rounded-2xl border border-indigo-500/20 bg-linear-to-b from-indigo-500/10 via-indigo-500/5 to-transparent p-6 sm:p-8">
                        <p className="text-lg leading-relaxed text-slate-200 sm:text-xl font-normal">
                            {guide.intro}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="mt-16 space-y-20">
                        {guide.sections.map((section, sectionIndex) => (
                            <section
                                id={`section-${sectionIndex + 1}`}
                                key={section.heading}
                                className="scroll-mt-28"
                            >
                                <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl tracking-tight">
                                    {section.heading}
                                </h2>

                                <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                                    {section.paragraphs.map((paragraph, pIdx) => (
                                        <p key={pIdx}>{paragraph}</p>
                                    ))}
                                </div>

                                {section.bullets && (
                                    <ul className="mt-6 space-y-3 rounded-xl border border-white/5 bg-white/[0.02] p-5 text-slate-200">
                                        {section.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base">
                                                <CheckCircle2 className="size-5 shrink-0 text-indigo-400 mt-0.5" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.steps && (
                                    <ol className="mt-8 space-y-5">
                                        {section.steps.map((step, stepIndex) => (
                                            <li
                                                key={step.title}
                                                className="grid grid-cols-[40px_1fr] gap-4 rounded-xl border border-white/5 bg-[#0e1326]/60 p-5 transition-all hover:border-indigo-500/30"
                                            >
                                                <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-sm font-extrabold text-white shadow-md shadow-indigo-500/20">
                                                    {stepIndex + 1}
                                                </span>
                                                <div>
                                                    <h3 className="font-display text-lg font-bold text-white">
                                                        {step.title}
                                                    </h3>
                                                    <p className="mt-1.5 leading-relaxed text-slate-300 text-sm sm:text-base">
                                                        {step.text}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </section>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    {guide.faq.length > 0 && (
                        <section id="faq" className="mt-16 scroll-mt-28 border-t border-white/10 pt-12">
                            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {guide.faq.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-white/10 bg-[#0c1020]/70 p-6 transition-colors hover:border-white/20"
                                    >
                                        <h3 className="font-display text-lg font-bold text-white mb-2">
                                            {item.question}
                                        </h3>
                                        <p className="leading-relaxed text-slate-300 text-sm sm:text-base">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* High-Converting CTA Box */}
                    <section className="relative mt-16 overflow-hidden rounded-2xl border border-indigo-500/30 bg-linear-to-br from-indigo-950/60 via-[#0e1329] to-purple-950/40 p-8 sm:p-10 shadow-2xl">
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 mb-4">
                                <Sparkles className="size-3.5" />
                                Chrome Extension
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                                {guide.ctaTitle}
                            </h2>
                            <p className="mt-3 text-slate-300 leading-relaxed max-w-2xl text-base sm:text-lg">
                                {guide.ctaText}
                            </p>
                            <Link
                                href={CHROME_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] active:scale-100"
                            >
                                <span>{guide.ctaButton}</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </section>

                    {/* Related / Next Guide Card */}
                    {relatedGuide && (
                        <div className="mt-14 border-t border-white/10 pt-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                                {guide.relatedLabel || "Next Recommended Guide"}
                            </span>
                            <Link
                                href={relatedHref}
                                className="group mt-3 flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0d1224]/60 p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#121933] hover:shadow-xl hover:shadow-indigo-950/50"
                            >
                                <div>
                                    <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-indigo-200 sm:text-2xl">
                                        {relatedGuide.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                                        {relatedGuide.description}
                                    </p>
                                </div>
                                <div className="shrink-0 flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all group-hover:bg-indigo-600 group-hover:translate-x-1">
                                    <ChevronRight size={20} />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
