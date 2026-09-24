import "../guides.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Calendar, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ChromeInstallButton from "@/components/ChromeInstallButton";
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
    const categoryLabel = guide.category || guide.eyebrow;

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
        <article className="guide-article">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
                }}
            />
            <div className="guides-shell">
                <nav aria-label={catalogCopy.label} className="guides-breadcrumb">
                    <Link href={homeHref}>{dict.privacy.breadcrumbHome}</Link>
                    <span aria-hidden="true">/</span>
                    <Link href={guidesHref}>{catalogCopy.label}</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{guide.title}</span>
                </nav>

                <header className="article-header">
                    <span className="guide-category-tag">{categoryLabel}</span>
                    <h1>{guide.title}</h1>
                    <p>{guide.description}</p>
                    <div className="article-meta">
                        <span><Clock3 size={15} aria-hidden="true" />{guide.readingTime}</span>
                        <span><Calendar size={15} aria-hidden="true" />{guide.updatedAt}</span>
                    </div>
                </header>

                <div className="article-cover">
                    <Image
                        src={image}
                        alt={guide.title}
                        width={1280}
                        height={800}
                        priority
                        sizes="(max-width: 1160px) calc(100vw - 40px), 1120px"
                    />
                </div>

                <div className="article-layout">
                    <aside className="article-sidebar">
                        <nav aria-label={guide.title} className="article-index">
                            <Button asChild variant="ghost" className="article-back">
                                <Link href={guidesHref}>
                                    <ArrowLeft size={16} aria-hidden="true" />
                                    {catalogCopy.label}
                                </Link>
                            </Button>
                            <ol>
                                {guide.sections.map((section, index) => (
                                    <li key={section.heading}>
                                        <a href={`#section-${index + 1}`}>
                                            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                                            {section.heading}
                                        </a>
                                    </li>
                                ))}
                                {guide.faq.length > 0 && <li><a href="#faq"><span aria-hidden="true">?</span>{dict.faq.title}</a></li>}
                            </ol>
                        </nav>
                    </aside>

                    <div className="article-body">
                        <p className="article-lead">{guide.intro}</p>
                        <div className="article-sections">
                            {guide.sections.map((section, sectionIndex) => (
                                <section id={`section-${sectionIndex + 1}`} key={section.heading} className="article-section">
                                    <div className="article-section-number" aria-hidden="true">{String(sectionIndex + 1).padStart(2, "0")}</div>
                                    <h2>{section.heading}</h2>
                                    {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                    {section.bullets && (
                                        <ul className="article-bullets">
                                            {section.bullets.map((bullet, index) => (
                                                <li key={index}><CheckCircle2 size={19} aria-hidden="true" /><span>{bullet}</span></li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.steps && (
                                        <ol className="article-steps">
                                            {section.steps.map((step, index) => (
                                                <li key={step.title}>
                                                    <span className="article-step-number" aria-hidden="true">{index + 1}</span>
                                                    <div><h3>{step.title}</h3><p>{step.text}</p></div>
                                                </li>
                                            ))}
                                        </ol>
                                    )}
                                </section>
                            ))}
                        </div>

                        {guide.faq.length > 0 && (
                            <section id="faq" className="article-faq article-section">
                                <h2>{dict.faq.title}</h2>
                                <Accordion type="multiple" defaultValue={["question-0"]}>
                                    {guide.faq.map((item, index) => (
                                        <AccordionItem key={item.question} value={`question-${index}`}>
                                            <AccordionTrigger>{item.question}</AccordionTrigger>
                                            <AccordionContent className="article-faq-answer">
                                                <p>{item.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </section>
                        )}

                        <section className="article-cta">
                            <span className="guides-eyebrow">Lectoro AI</span>
                            <h2>{guide.ctaTitle}</h2>
                            <p>{guide.ctaText}</p>
                            <ChromeInstallButton label={guide.ctaButton} />
                        </section>

                        {relatedGuide && (
                            <nav className="article-related" aria-label={catalogCopy.label}>
                                <Link href={relatedHref} className="article-related-card">
                                    <div className="article-related-image">
                                        <Image
                                            src={GUIDE_IMAGES[relatedGuide.slug] || "/showcase/1.jpg"}
                                            alt=""
                                            width={400}
                                            height={250}
                                            sizes="(max-width: 640px) calc(100vw - 40px), 200px"
                                        />
                                    </div>
                                    <div className="article-related-copy">
                                        <span className="guide-reading-time"><Clock3 size={13} aria-hidden="true" />{relatedGuide.readingTime}</span>
                                        <h2>{relatedGuide.title}</h2>
                                        <span className="guide-read">{catalogCopy.readGuide}<ArrowRight size={16} aria-hidden="true" /></span>
                                    </div>
                                </Link>
                                <Button asChild variant="ghost" className="article-back">
                                    <Link href={guidesHref}><ArrowLeft size={16} aria-hidden="true" />{catalogCopy.label}</Link>
                                </Button>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
